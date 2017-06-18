'use strict'

const express = require('express')
const producCtrl = require('../controllers/animal')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/product', producCtrl.getProducts)
api.get('/product/:productId', producCtrl.getProduct)
api.post('/product', auth, producCtrl.saveProduct)
api.put('/product', auth, producCtrl.updateProduct)
api.delete('/product', auth, producCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

// Auth test
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso'})
})

module.exports = api