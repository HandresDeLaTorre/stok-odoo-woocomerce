'use strict';
/**
 * Lectura del CSV de productos
 */

const csv = require('csv-parser');
const fs = require('fs');
//const results = [];

const file = './file/Inventario-pruebas-API.csv';

const fileread = [];

const fileProducts = () => {
  const results = [];
  fs.createReadStream(file)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    //console.log(results);
  });
  return results
}

const readFileCsv = (fileCsv) => {
  
  const archivo = fs.createReadStream(fileCsv)
  .pipe(csv())
  .on('data', (data) => {
    var newArray = fileread.push(data);
  })
  const archivoListo = archivo.on('end', () => {
    //console.log(fileread);
  });
  return newArray;
} 
 
module.exports = {
  fileProducts,
  readFileCsv
}