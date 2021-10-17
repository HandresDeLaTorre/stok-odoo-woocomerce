'use strict';
/**
 * Lectura del CSV de productos
 */

const csv = require('csv-parser');
const fs = require('fs');
//const results = [];

const dataFile = (unarchivo) => {
  const results = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(unarchivo)
    .on('error', error => {
      reject(error);
    })
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      resolve(results);
    });
  })
}

module.exports = {
  dataFile
}