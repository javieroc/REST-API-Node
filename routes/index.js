'use strict'

const express = require('express')
const router = express.Router()

const productController = require('../controllers/product')

// Get product list.
router.get('/product', productController.getProducts)

// Get a product by id.
router.get('/product/:productId', productController.getProduct)

// Insert a new product.
router.post('/product', productController.saveProduct)

// Update a particular product
router.put('/product/:productId', productController.updateProduct)

// Delete a product by id.
router.delete('/product/:productId', productController.deleteProduct)

module.exports = router