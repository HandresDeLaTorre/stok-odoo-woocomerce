/**
 * Router woocomerce api principal
 */
 const express = require('express')
 const router = express.Router()
 const checkOrigin = require('../middleware/origin')
 const index = require('../controllers/woocommerce/index')


 router.get('/', index.hola)

 router.get('/products', index.getProduct)

 router.get('/createproduct', index.createProductindex)

 router.get('/categorys', index.categorys)

 router.get('/createcategory', index.newCategory)

 router.get('/createsubcategory', index.newSubCategory)

 router.get('/findcateg/:name', index.findCateg)

 router.get('/attribute', index.searchAttributeindex) //searchAttributeIdIndex

 router.get('/attribute/:name', index.searchAttributeIdIndex)

 router.get('/validate', index.validate)

 module.exports = router