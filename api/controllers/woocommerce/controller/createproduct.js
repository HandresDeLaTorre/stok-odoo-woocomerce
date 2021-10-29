'use strict'
/**
 * Controller productos 
 */

const { woccommerce } = require('../../../../config/config')

const { productWoocomerce, categoryColumn } = require('../../../utils/construirProduct')
const { findCategory, findSubCategory } = require('./category');
const { searchAttributeId, validateAttribute } = require('./atributos')


const api = woccommerce


const getProducts = async () => {
    try {
        const productos = await api.get("products")
        const product = await productos.data.map((i) => {
            return {
                id: i.id,
                name: i.name,
                categories: [i.categories],
                permalink: i.permalink,
                sku: i.sku,
                price: i.price,
                regular_price: i.regular_price,
                attributes: i.attributes,
                stock_quantity: i.stock_quantity,
                type: i.type,
                variations: i.variations,
            }
        })
        console.log('***✔️', product);
        return product
    } catch (e) {
        console.error(`❌ Controller || Error ==> ${e.message}`)
    }
}


// const createProductOld = async () => {
//     try {
//         const producto = await productWoocomerce()
//         const testCreate = producto.map( async (producto) => {
//         const createProduct = await api.post("products", producto)
//         console.log('***✔️ Controller',createProduct.data);
//         return createProduct.data;
//         })
//         // const createProduct = await api.post("products", producto)
//         // console.log('***✔️ Controller',createProduct.data);
//         // return createProduct.data;
//         ////////////////////////////////////////////////////
//         //console.log('***✔️ Controller',producto);
//         return producto;
//     } catch (e) {
//         console.error(`❌ || Error ==> ${e}`)
//     }
// }

const createProduct = async () => {
    try {
        const producto = await productWoocomerce();
        // console.log('***✔️ Controller',producto);
        const newProduct = Promise.all(producto.map(async (item) => {
            const validateCategory = await findCategory(item.category)
            const validateSubCategory = await findSubCategory(item.subCategory);
            // const color = item.Color != null ? item.Color:""
            // const attribute = await {
            //     Color: color,
            //     Talla: item.Talla
            // }
            const validateAttributeColor = await searchAttributeId('Color')
            const validateAttributeTalla = await searchAttributeId('Talla')
            // console.log('***Attribute: ',validateAttributeColor);
            //console.log(attribute, validateAttributeTalla.id); 
            const copiaNewproduct = await {
                ...item,
                categories: [
                    validateSubCategory,
                    validateCategory,
                ],
                attributes: [
                    {
                        id: validateAttributeColor.id,
                        name: validateAttributeColor.name,
                        visible: true,
                        variation: true,
                        options: [
                            item.Color,
                        ]
                    },
                    {
                        id: validateAttributeTalla.id,
                        name: validateAttributeTalla.name,
                        visible: true,
                        variation: true,
                        options: [
                            item.Talla,
                        ]
                    }
                ]
            }
            const createProduct = await api.post("products", copiaNewproduct)
            console.log(`***✔️ Nuevo Producto ${createProduct.data.id}`);
            const dataVariation = {
                regular_price: item.regular_price,
                attributes: [
                    {
                        id: validateAttributeColor.id,
                        option: item.Color
                    },
                    {
                        id: validateAttributeTalla.id,
                        option: item.Talla
                    }
                ]
            }

            const putVariation = await api.post(`products/${createProduct.data.id}/variations`, dataVariation)
            console.log(`***✔️ Nuevo Update ${putVariation.data.id}`)
            return copiaNewproduct
        }))
        return newProduct
    } catch (e) {
        console.error(`❌ ❌ || Error ==> ${e}`)
    }
}

module.exports = {
    getProducts,
    createProduct,
}