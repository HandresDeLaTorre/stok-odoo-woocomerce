'use strict';

const csv = require('csv-parser');
const fs = require('fs');

const file = './file/Inventario-pruebas-API.csv';

const getData = (unarchivo) => {
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

const pruebaField = async () => {
  try { 
    const data = await getData(file, {});
    console.log("testGetData: parsed CSV data:", data[0]);
} catch (error) {
    console.error("testGetData: An error occurred: ", error.message);
}
}

pruebaField();

