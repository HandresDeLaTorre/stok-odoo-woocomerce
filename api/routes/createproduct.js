/**
 * Router create product principal
 */
const express = require('express');
const router = express.Router();
const checkOrigin = require('../middleware/origin');
const createOdoo = require('../controllers/createproduct/createproduct')


router.get('/', createOdoo.holaProduct)

router.get('/readfile', createOdoo.readProducts)

module.exports = router