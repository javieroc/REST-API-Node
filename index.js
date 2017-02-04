'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')
const productController = require('./controllers/product')

const mongodbUri = `${config.mongodb.url}/${config.mongodb.database}`
const app = express()
const port = process.env.PORT || 3000

// Midlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Get product list.
app.get('/api/product', productController.getProducts)

// Get a product by id.
app.get('/api/product/:productId', productController.getProduct)

// Insert a new product.
app.post('/api/product', productController.saveProduct)

// Update a particular product
app.put('/api/product/:productId', productController.updateProduct)

// Delete a product by id.
app.delete('/api/product/:productId', productController.deleteProduct)

mongoose.connect(mongodbUri, (err, res) => {
  if (err) {
    return console.log(`Error en la conexión a la base de datos: ${mongodbUri}`)
  }

  console.log('Conexión a la base de datos establecida...')

  app.listen(port, () => {
    console.log(`API rest corriendo en http://localhost:${port}`)
  })
})
