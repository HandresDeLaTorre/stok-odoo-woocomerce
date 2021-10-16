'use strict';

const csv = require('csv-parser')
const fs = require('fs')
const results = [];

const file = './file/Inventario-pruebas-API.csv'

const arrayResultado = (unArchivo) => {

  console.log(unArchivo);

  const resultado = () => {
    fs.createReadStream(unArchivo)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    return results
 });
}
console.log('*** Este es el inicio de la data', resultado());
//return results
}

arrayResultado(file) 