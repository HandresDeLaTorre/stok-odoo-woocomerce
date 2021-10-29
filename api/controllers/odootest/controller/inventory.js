/**
 * Controller Inventory test
 */

'use strict'

const {odooTest} = require('../../../../config/config');

const connect = configOdoo.odoo.connect();

const fieldsInventory = async () => {
    await connect;
    try {
        return await odoo.getFields(`stock.inventory`, ['required'])
    } catch (e) {
        console.error(`❌ || Error ==> ${e.message}`)
    }
}
