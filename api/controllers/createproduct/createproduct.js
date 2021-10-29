'use strict'
/**
 * Controller create product principal
 */

 const { httpError } = require('../../helpers/handleError')
 //const mautic = require('../mautic/apimautic')
 const odooApi = require('../odoo/odooapi');

 const {fieldsInventory, changeQuantity} = require('../odoo/odooinventory')

 const arrayProducts = require('../../utils/readfile')
 //const img64 = require('../../utils/convertimg64');
const productoA = require('../../utils/construirProduct')

 const holaProduct = (req, res) => {
    res.send(`<h1>Hola Puedes crear un producto</h1>`);
}

const file = './file/Inventario-pruebas-API.csv';


const readProducts = async (req, res) => {
    const productsForCreate = await arrayProducts.dataFile(file)
    //console.log(productsForCreate );
    res.status(200).send(productsForCreate)
}

const newProduct = async (req, res) => {
    const productsArray =  await arrayProducts.dataFile(file, {});
    // const barCode = productsArray[0].CODIGO;
    const barCode = productsArray.map(item => item.CODIGO )//['CODIGO'])   
    const productExiste = barCode.map( async (item) =>{
       return await odooApi.searchCode(item);
        //console.log(`*El producto existe: ${productExists}`);
    })
    const pp = await productExiste
    console.log(pp);    
}

const newcategory = async (req, res) => {
        const {name} = req.body

        const productsArray =  await arrayProducts.dataFile(file, {});
        // const barCode = productsArray[0].CODIGO;
        const categSubcateg = productsArray.map(item => {
            return [item.CATEGORIA, item.SUBCATEGORIA]} )
        
    try {
        // const categoryName = productsArray.map(item => item.CATEGORIA)
        // const subCategoryName = productsArray.map(item => item.SUBCATEGORIA)

        const createCategory = productsArray.map( async (item) => {
            const newCategory = item.CATEGORIA
            const newSubCategory = item.SUBCATEGORIA
            const buscaCategory = await odooApi.searchCategoryName(newCategory);
            const buscaSubCategoria = await odooApi.searchCategoryName(newSubCategory);
            console.log(`**** ${buscaCategory} <br> ** ${buscaSubCategoria} `);
            if (buscaCategory == 0 && buscaSubCategoria == 0) {
                const crearNuevaCategoria = await odooApi.createCategory(newCategory)
                const crearNuevaSubCategoria = await odooApi.createSubCategory(newSubCategory, buscaCategory)
                console.log(`***Se crearon las categorias ${crearNuevaCategoria} / ${crearNuevaSubCategoria}`);
            }else if (buscaCategory !== 0 && buscaSubCategoria == 0) {
                const crearNuevaSubCategoria = await odooApi.createSubCategory(newSubCategory, newCategory)
                console.log(`**Se creo la categoria ${crearNuevaSubCategoria}`);
            }else {
                console.log(`No se pueden crear categorias`);
            }
            return buscaCategory
        })
        res.status(200).send(createCategory) 
    } catch (e) {
        console.error(`*** Error ==> ${e}`)
        res.status(400).send(`*** Error ==> ${e}`)
     }
}

// const createNewProductStep1 = async () => {
//     const productsForCreate = await arrayProducts.dataFile(file);

//     return productsForCreate.map( async products => {
//              const name = products['Nombre'];
//              const list_price = products['Promedio de PRECIO VENTA'];
//              const image = await img64.convertImage(products['URL Image']);
//              const categoryId = await odooApi.searchCategoryNameComplete(products['categ/complete']);
//              const barcode = products['CODIGO'];
//              const default_code = products['REFERNCIA'];
//              const qty_available = products['Suma de CANTIDAD ACTUAL'];
//              const description = products['DECRIPCION'];
             
//     const newarray = [  name ,
//                 list_price,
//                 image,
//                 barcode,
//                 default_code,
//                 qty_available,
//                 description,
//                 categoryId
//             ];
//             //console.log(newarray);
//     return newarray  
//     })
// }


const createNewProduct = async (req, res) => {
    const products = req.body;
    
    try {
        const productico = await productoA.construir();
        // const prod = await productico.map( async (product) =>{
        //     console.log(` soy el log de ${product}`);
        //     const idNewProduct = await odooApi.createProduct(product)
        //     console.log(idNewProduct);
        // })
        res.status(200).send(`***<br>El producto se creo Que Bueno  ${JSON.stringify(productico)} <br> ** `); //${idNewProduct}
    } catch (e) {
        console.error(`*** Error ==> ${e}`)
        res.status(400).send(`*** Error ==> ${e}`) 
    }


    // const name = products.name;
    // const list_price = products.list_price; 
    // const image_1920 = products.image_1920;
    // const barcode = products.barcode;
    // const default_code = products.default_code;
    // const qty_available = products.qty_available;
    // const description = products.description;
    // const categ_id = products.categ_id;

    // const convertImg = await img64.convertImage(image_1920)
    // const product = {
    //     name : name,
    //     list_price : list_price, 
    //     image_1920 : convertImg,
    //     barcode : barcode,
    //     default_code : default_code,
    //     qty_available : qty_available,
    //     description : description,
    //     categ_id : categ_id, 
    // };
    //const idNewProduct = await odooApi.createProduct(productico)
}



const deleteProduct = async (req, res) => {
    const {barCode} = req.params;
    const idProduct = await odooApi.searchCode(barCode)
    console.log(idProduct);
    const deleteProduct = await odooApi.deleteProduct(idProduct)
    res.status(200).send(`${idProduct} <br>*** Se borro el producto  ${deleteProduct}`)
}


const fieldsReadInventory = async (req, res) => {
    try {
        const fields = await fieldsInventory();
        res.status(200).send(fields)
    } catch (e) {
        console.error(`❌ || Error ==> ${e.message}`)
    }
}

const changeQuantityInventory = async (req, res) => {
    try {
        const fields = await changeQuantity();
        res.status(200).send(fields)
    } catch (e) {
        console.error(`❌ || Error ==> ${e.message}`)
    }
}

module.exports = { 
    fieldsReadInventory,
    changeQuantityInventory,
    createNewProduct,
    deleteProduct,
    holaProduct,
    readProducts,
    newProduct,
    newcategory,
}