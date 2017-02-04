'use strict'

const mongoose = require('mongoose')

const config = require('./config')
const app = require('./app')

const mongodbUri = `${config.mongodb.url}/${config.mongodb.database}`
const port = config.port

mongoose.connect(mongodbUri, (err, res) => {
  if (err) {
    return console.log(`Error en la conexión a la base de datos: ${mongodbUri}`)
  }

  console.log('Conexión a la base de datos establecida...')

  app.listen(port, () => {
    console.log(`API rest corriendo en http://localhost:${port}`)
  })
})
