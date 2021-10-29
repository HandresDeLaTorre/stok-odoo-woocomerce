'use strict'
/**
 * Controller Odoo API Inventory stock.inventory
 */
const configOdoo = require('../../../config/config');
const {odoo} = require('../../../config/config');

const connect = configOdoo.odoo.connect()


const fieldsInventory = async () => {
    await connect;
    try {
        return await odoo.getFields(`stock.inventory`, ['required'])
    } catch (e) {
        console.error(`❌ || Error ==> ${e.message}`)
    }

}

const changeQuantity = async () => {
    await connect;
    try {
        const productId = await odoo.search(`product.template`, {barcode:7700101350010})
        const changeQuantity = await odoo.update(`product.template`, 193, {
            action: 'update',
            value: [
                {location_id:8},
                {new_quantity:21}
            ]
        })
        //odoo.create(`stock.quant`, {product_id:193, location_id:8, new_quantity:21})
        console.log(changeQuantity);
        return productId;
    } catch (e) {
        console.error(`❌ || Error ==> ${e.message}`)
    }
}

module.exports = {
    fieldsInventory,
    changeQuantity
}