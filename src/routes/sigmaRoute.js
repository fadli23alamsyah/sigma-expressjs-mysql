const express = require('express')

const sigmaRoute = express.Router()

const { getUserSigma } = require('../controllers/sigmaController')

sigmaRoute.route('/:user').get(getUserSigma)

module.exports = sigmaRoute