'use strict'

const odooApi = require('../controllers/odoo/odooapi');
const arrayProducts = require('./readfile')
const img64 = require('./convertimg64');

const fileSave = './file/Inventario-pruebas-API.csv';
//file\Inventario-pruebas-API.csv

// const productRhm = arrayProducts.dataFile(file);

const arrayFile = async (file) => {
    return await arrayProducts.dataFile(file);
}


const construir = async () => {
    const productsForCreate = await arrayProducts.dataFile(file);

    // const otroArray = 
    return productsForCreate.map(async (products) => {
        const name = products['Nombre'];
        const list_price = parseInt(products['Promedio de PRECIO VENTA']);
        const image_1920 = await img64.convertImage(products['URL Image']);
        const categoryid = await odooApi.searchCategoryNameComplete(products['categ/complete']);
        const categ_id = parseInt(categoryid)
        const barcode = products['CODIGO'];
        const default_code = products['REFERNCIA'];
        const qty_available = products['Suma de CANTIDAD ACTUAL'];
        const inventory_quantity = qty_available
        const description = products['DECRIPCION'];
        // const attribute_line_ids = [ 2, 1];
        // const valid_product_template_attribute_line_ids = [ 2, 1];
        const type =  'product';
        const can_image_1024_be_zoomed = true;

        const newarray = [
            {
                name,
                list_price,
                image_1920,
                barcode,
                default_code,
                qty_available,
                description,
                categ_id,
                // attribute_line_ids,
                // valid_product_template_attribute_line_ids,
                can_image_1024_be_zoomed,
                type,
            }
        ];
        const arrayPrueba = newarray.map(item => {
            const itemConsulta = item.qty_available;
            console.log(`||** La consulta es ${ itemConsulta}`);
        })
        const idNewProduct = await odooApi.createProduct(newarray)
        return idNewProduct
    })
}

const productoArchivo = async () => {
    const productRhm = await arrayProducts.dataFile(file);
    //console.log(productRhm);
     return await productRhm.map( (products) => {
        //const name = products.Nombre
        return {
            name : products.Nombre, 
            type : "simple",
            sku: products['CODIGO'],
            price: products['Promedio de PRECIO VENTA'],
            short_description : products['DECRIPCION'],
            stock_quantity: products['Suma de CANTIDAD ACTUAL'],
            images : [
                {
                    src: products['URL Image']
                }
                ],
            }
        })
}

const imageB64 = async () => {
    const imageArray = await arrayFile(fileSave);
    const imagenUrl = await Promise.all(imageArray.map( async (image) => {
        return image['URL Image'] = img64.convertImage(image['URL Image']);
    }))

    return imagenUrl
}

const productOdoo = async () => {
    const product = await arrayFile(fileSave)

    const producto = Promise.all(product.map(async (odooProduct) => {
        const arrayProduct = {
            name : odooProduct['Nombre'],
            list_price : parseInt(odooProduct['Promedio de PRECIO VENTA']),
            image_1920 : await img64.convertImage(odooProduct['URL Image']),
            categ_id :  await odooApi.searchCategoryNameComplete(odooProduct['categ/complete']),
            barcode : odooProduct['CODIGO'],
            default_code : odooProduct['REFERNCIA'],
            qty_available : odooProduct['Suma de CANTIDAD ACTUAL'],
            description : odooProduct['DECRIPCION'],
            type : 'product',
            image_1024: await img64.convertImage(odooProduct['URL Image']),
            can_image_1024_be_zoomed : true 
        }
        return arrayProduct
    }))
    return producto
}

const productWoocomerce = async () => {
    const productRhm = await arrayProducts.dataFile(fileSave);
    //console.log(productRhm);
     return productRhm.map( (products) => {
        //const name = products.Nombre
        return {
            name : products.Nombre,
            type : "variable",
            sku: products.REFERNCIA,
            regular_price: products['Promedio de PRECIO VENTA'],
            price:products['Promedio de PRECIO VENTA'],
            short_description : products['DECRIPCION'],
            description: `<h1>Moda de Colombia para el mundo ${products['DECRIPCION']} </h1>`,
            manage_stock: true,
            stock_quantity: parseInt(products['Suma de CANTIDAD ACTUAL']),
            images : [
                {
                    src: products['URL Image']
                }
                ],
            category: products.CATEGORIA,
            subCategory : products.SUBCATEGORIA,
            Talla: products.Atributo_Talla.trim(),
            Color: products.Atributo_Color.trim()
            }
        })
}



const categoryColumn = async () => {
    const category = await arrayProducts.dataFile(fileSave);
    return await category.map((category)=>{
        return {
            Category: category.CATEGORIA,
            subCategory : category.SUBCATEGORIA
        } 
    })
}

const attribute = async () => {
    const category = await arrayProducts.dataFile(fileSave);
    return category.map((attribute)=>{
        return {
            Talla: attribute.Atributo_Talla,
            Color : attribute.Atributo_Color
        }
    })
}


module.exports = {
    productWoocomerce,
    categoryColumn,
    productOdoo,
    productoArchivo,
    construir,
    attribute,
    imageB64
}