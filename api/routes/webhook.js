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

router.get('/product/:ref', webhook.getproduct)


router.get('/', webhook.respuesta)



module.exports = router