'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./config')
const Product = require('./models/product')

const mongodbUri = `${config.mongodb.url}/${config.mongodb.database}`
const app = express()
const port = process.env.PORT || 3000

// Midlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Get product list.
app.get('/api/product', (req, res) => {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}.` })

    if (!products) return res.status(404).send({ message: `No existen productos` })

    res.status(200).send({ products })
  })
})

// Get a product by id.
app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}.` })

    if (!product) return res.status(404).send({ message: `El producto no existe` })

    res.status(200).send({ product })
  })
})

// Insert a new product.
app.post('/api/product', (req, res) => {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()

  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: `Error al salvar en la base de datos: ${err}` })

    res.status(200).send({ product: productStored })
  })
})

// Update a particular product
app.put('/api/product/:productId', (req, res) => {
  const productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, product) => {
    if (err) return res.status(500).send({ message: `Error al actualizar el producto: ${err}.` })

    res.status(200).send({ product })
  })
})

// Delete a product by id.
app.delete('/api/product/:productId', (req, res) => {
  const productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}.` })

    product.remove(err => {
      if (err) return res.status(500).send({ message: `Error al borrar el producto: ${err}.` })

      res.status(200).send({ message: `El producto ha sido eliminado` })
    })
  })
})

mongoose.connect(mongodbUri, (err, res) => {
  if (err) {
    return console.log(`Error en la conexión a la base de datos: ${mongodbUri}`)
  }

  console.log('Conexión a la base de datos establecida...')

  app.listen(port, () => {
    console.log(`API rest corriendo en http://localhost:${port}`)
  })
})
