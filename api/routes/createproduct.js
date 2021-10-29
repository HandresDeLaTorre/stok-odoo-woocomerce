/**
 * Router create product principal
 */
const express = require('express');
const router = express.Router();
const checkOrigin = require('../middleware/origin');
const createOdoo = require('../controllers/createproduct/createproduct')



router.get('/', createOdoo.holaProduct)

router.get('/readfile', createOdoo.readProducts)

router.get('/delete/:barCode', createOdoo.deleteProduct)

router.get('/inventory', createOdoo.fieldsReadInventory)

router.post('/newproduct', createOdoo.newProduct)

router.post('/createtest', createOdoo.createNewProduct)

router.post('/newcategory', createOdoo.newcategory)

router.post('/cantidad', createOdoo.changeQuantityInventory)



module.exports = router