/**
 * Controller create product principal
 */

 const { httpError } = require('../../helpers/handleError')
 //const mautic = require('../mautic/apimautic')
 const odooApi = require('../odoo/odooapi');
 const arrayProducts = require('../../utils/readfile')

 const holaProduct = (req, res) => {
    res.send(`<h1>Hola Puedes crear un producto</h1>`);
}

const file = './file/Inventario-pruebas-API.csv';


const readProducts = (req, res) => {
    // const productsForCreate = JSON.stringify(arrayProducts.fileProducts());
    // console.log(productsForCreate);
    const productsForCreate = arrayProducts.readFileCsv(file)
    console.log(productsForCreate.data );
    res.status(200).send(productsForCreate.data)
}

module.exports = { 
    holaProduct,
    readProducts
}