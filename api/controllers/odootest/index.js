'use strict'

/**
 * Index controller Odoo test
 */

const productApi = require('./controller/product');



const hola = (req, res) => {
    res.send(`<h1>Funciona La API de Odoo Test de localhost</h1>`)
}

const getProduct = async (req, res) => {
    const {barcode} = req.params
    try {
        const products = await productApi.getProduct(barcode);
        res.status(200).send(JSON.stringify(products))
    } catch (e) {
        console.error(`❌ || Error ==> ${e.message}`)
    }
}

const createProductindex = async (req, res) => {
    try {
        const productoData = await productApi.createProduct();
        const respuesta = `✔️ Producto ${JSON.stringify(productoData)} se creo ` 
        res.status(200).send(respuesta);
    } catch (e) {
        console.error(`❌ || Error ==> ${e}`)
    }
}

module.exports = {
    hola,
    getProduct,
    createProductindex
}