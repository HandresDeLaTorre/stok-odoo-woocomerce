'use strict'

const odooApi = require('../controllers/odoo/odooapi');
const arrayProducts = require('./readfile')
const { woccommerce } = require('../../config/config')
const _ = require('underscore');
const capitalize = require('capitalize')

const api = woccommerce


const fileSave = './file/Inventario-pruebas-API.csv';


const subCategories = async () => {
    const categExistentes = await api.get('products/categories');
    const subCategoryFile = await arrayProducts.dataFile(fileSave);
    try {
        // Paso 1 alistamos el archivo con los campos Categoria y Sub Categoria
        const subCategoryInit = subCategoryFile.map((category)=>{
            return {
                Category: category.CATEGORIA,
                subCategory : category.SUBCATEGORIA
            } 
        });
        const savesubCategoryInit = await subCategoryInit;
        // fin Paso 1 //

        // Paso 2 Eliminar los valores repetidos
        const subCategoryReduce = _.uniq(savesubCategoryInit, function(subCat){
            // console.log( savecompararCategoria);
            return subCat.subCategory;
        })
        // console.log(subCategoryReduce);
        return subCategoryReduce
    } catch (e) {
        console.error(`❌ || File Categories Error ==> ${e}`)
    }
}


const categories = async () => {
    const categoryFile = await arrayProducts.dataFile(fileSave);
    try {
        // Paso 1 alistamos el archivo con los campos Categoria 
        const categoryInit = categoryFile.map((category)=>{
            return {
                Category: category.CATEGORIA,
            } 
        });
        const saveCategoryInit = await categoryInit;
        // fin Paso 1 //

        // Paso 2 Eliminar los valores repetidos
        const categoryReduce = _.uniq(saveCategoryInit, function(cat){
            // console.log( savecompararCategoria);
            return cat.Category;
        })
        // console.log(categoryReduce);
        return categoryReduce
    } catch (e) {
        console.error(`❌ || File Categories Error ==> ${e}`)
    }
}
categories()

module.exports = {
    subCategories,
    categories
}
