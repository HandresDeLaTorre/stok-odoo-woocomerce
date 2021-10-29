/**
 * Router Webhook principal
 */
const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')
const webhook = require('../controllers/webhooks/webhook')
//webhook inicia

router.post('/pruebas', checkOrigin, webhook.postPruebas)

router.post('/points', checkOrigin, webhook.pointschange)

router.get('/fields/:domain/type/:type', webhook.fields)

router.get('/search/:domain/type/:type', webhook.getRead)

router.get('/searchid/:domain/type/:type/id/:id', webhook.getReadID)

//router.get('/searchall', webhook.getQuery)

router.get('/product/:barCode', webhook.getproduct)

router.get('/searchproduct/:barCode', webhook.searchProductBarcode)


router.get('/', webhook.respuesta)



module.exports = router