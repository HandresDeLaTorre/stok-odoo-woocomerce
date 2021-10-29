/**
 * Controller Inventory test
 */

'use strict'

const { odooTest } = require('../../../../config/config');
const {productOdoo, imageB64} = require('../../../utils/construirProduct')

const connect = odooTest.connect();

const getProduct = async (barcode) => {
    await connect;
    try {
        //return await odoo.getFields(`stock.inventory`, ['required'])
        const productRef = await odooTest.search(`product.product`, { barcode: barcode });
        return await odooTest.read('product.product', [parseInt(productRef[0])])
    } catch (e) {
        console.error(`❌ || Error ==> ${e.message} <br> ** ${e.stack}`)
    }
}


const createProduct = async () => {
    try {
        const productoRaw = await productOdoo()
        console.log(productoRaw[1]);
        return productoRaw[1].image_1024
    } catch (e) {
        console.error(`❌ || Error ==> ${e.message} <br> ** ${e.stack}`)
    }
}

module.exports = {
    getProduct,
    createProduct
}

