const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')
const index = require('../controllers/odootest/index')

router.get('/', index.hola)

router.get('/product/:barcode', index.getProduct)

router.get('/crearProduct', index.createProductindex)

module.exports = router