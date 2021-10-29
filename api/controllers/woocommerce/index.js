/**
 *Index Woocommerce  
 */

'use strict'

const product = require('./controller/createproduct')

const {
    getCategory, 
    findCategory, 
    createSubCategory,
    createCategory
} = require('./controller/category')

const { searchAttribute, 
        searchAttributeId,
        validateAttribute
    } = require('./controller/atributos')



const hola = (req, res) => {
    res.send(`<h1>Funciona La API de woocommerce de localhost</h1>`)
}

const categorys = async (req, res) => {
    try {
        const categorysId = await getCategory()
        console.log(`Console index categorys: `, categorysId);
        res.status(200).send(categorysId)
    } catch (e) {
        console.error(`❌ ||Index Error ==> ${e.message}`)
    }
}

const newCategory = async (req, res) => {
    try {
        const categorysId = await createCategory()
        //console.log(categorysId);
        res.status(200).send(categorysId)
    } catch (e) {
        console.error(`❌ ||Index new Category Error ==> ${e.message}`) 
    }
}

const newSubCategory = async (req, res) => {
    try {
        const subCategorysId = await  createSubCategory()
        //console.log(subCategorysId);
        res.status(200).send(subCategorysId)
    } catch (e) {
        console.error(`❌ ||Index Error ==> ${e}`)
    }
}


const findCateg = async (req, res) => {
    const {name} = req.params
    try {
        const categorysId = await findCategory(name)
        console.log(categorysId);
        res.status(200).send(JSON.stringify(categorysId))
    } catch (e) {
        console.error(`❌ ||Index Error ==> ${e.message}`)
    }
}

const searchAttributeindex = async (req, res) => {
    try {
        const categorysId = await searchAttribute()
        console.log(categorysId.data);
        res.status(200).send(categorysId.data)
    } catch (e) {
        console.error(`❌ ❌ ||Index Error ==> ${e} <br> ${e.message}`)
    }
}

const searchAttributeIdIndex = async (req, res) => {
    const {name} = req.params
    try {
        const categorysId = await searchAttributeId(name)
        console.log(categorysId);
        res.status(200).send(categorysId)
    } catch (e) {
        console.error(`❌ ❌ ||Index Error ==> ${e} <br> ${e.message}`)
    }
}

const validate = async (req, res) => {
    try {
        const validador = await validateAttribute('Color') 
        console.log(validador);
        res.status(200).send(validador)
    } catch (e) {
        console.error(`❌ ❌ ||Index Error ==> ${e} <br> ${e.message}`)
    }
}

const getProduct = async (req, res) => {
    try {
        const products = await product.getProducts();
        res.status(200).send(JSON.stringify(products))
    } catch (e) {
        console.error(`❌ Index || Error ==> ${e}`)
    }
}

const createProductindex = async (req, res) => {
    try {
        const productoData = await product.createProduct();
        const respuesta = `✔️ Producto ${JSON.stringify(productoData)} se creo ` 
        res.status(200).send( productoData);
    } catch (e) {
        console.error(`❌ Index Create Product || Error ==> ${e}`)
    }
}
 
module.exports = {
    hola,
    findCateg,
    getProduct,
    newCategory,
    categorys,
    createProductindex,
    validate,
    searchAttributeindex,
    newSubCategory,
    searchAttributeIdIndex
}

// const dataVariation = {
//     regular_price: item.regular_price,
//     attributes: [
//         {
//             id: validateAttributeColor.id,
//             option: item.Color
//         },
//         {
//             id: validateAttributeTalla.id,
//             option: item.Talla
//         }
//     ]
// }

// const putVariation = await api.post(`products${createProduct.data.id}/variations`, dataVariation)
// console.log(`***✔️ Nuevo Producto ${dataVariation}`)