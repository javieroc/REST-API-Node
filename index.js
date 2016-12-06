'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config.json')

const mongodbUri = `mongodb://${config.mongodb.user}:${config.mongodb.pass}@${config.mongodb.host}/${config.mongodb.database}`

const app = express()
const port = process.env.PORT || 3000

// Midlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product', (req, res) => {
  res.status(200).send({products: []})
})

app.get('/api/product/:productId', (req, res) => {

})

app.post('/api/product', (req, res) => {
  console.log(req.body)
  res.status(200).send({message: 'the product its ok!'})
})

app.put('/api/product/:productId', (req, res) => {

})

app.delete('/api/product/:productId', (req, res) => {

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
