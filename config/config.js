/**
 * Controller Odoo API
 */
 require('dotenv').config()

const Odoo = require('odoo-await');
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;



const odoo = new Odoo({
    baseUrl: process.env.PRODUODOOBASEURL,
    db: process.env.PRODUODOODB,
    port: process.env.PRODUODOOPORT,
    username: process.env.PRODUODOOUSER,
    password: process.env.PRODUODOOPSW,
    // baseUrl: 'https://ropahermosa.iku.solutions',
    // db: 'ropahermosa.iku.solutions',
    // port: 443,
    // username: 'gerencia@ropahermosamujer.com',
    // password: 'def8ba9ec544cf6f39eb4f1abddb94ae38e2c3cf'
})

const odooTest = new Odoo({
    baseUrl: 'https://staging-ropahermosa.iku.solutions/',
    db: 'staging-ropahermosa.iku.solutions',
    port: 443,
    username: 'gerencia@ropahermosamujer.com',
    password: '9a4e488ac6a4d492619ef1759c0d641b040c6719'
})



const woccommerce = new WooCommerceRestApi({
    url: "https://chyk.io/",
    consumerKey: process.env.WOCOOCLIENTKEY,
    consumerSecret: process.env.WOCCOCLIENTSECRET,
    version: "wc/v3"
  }); 


module.exports ={
    odoo,
    odooTest,
    woccommerce
}