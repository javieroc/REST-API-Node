'use strict'

const express = require('express')
const router = express.Router()

const productController = require('../controllers/product')
const userController = require('../controllers/user')
const auth = require('../middlewares/auth')

// Get product list.
router.get('/product', auth, productController.getProducts)

// Get a product by id.
router.get('/product/:productId', productController.getProduct)

// Insert a new product.
router.post('/product', productController.saveProduct)

// Update a particular product
router.put('/product/:productId', productController.updateProduct)

// Delete a product by id.
router.delete('/product/:productId', productController.deleteProduct)

router.post('/singup', userController.singUp)

router.post('singin', userController.singIn)

router.get('/private', auth, (req, res) => {
    res.status(200).send({ message: `Tiene acceso` })
})

module.exports = router
