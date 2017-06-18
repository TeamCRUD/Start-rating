'use strict'

// Get elements
const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

// Create handler
function createToken (user) {
    const playload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

    return jwt.encode(playload, config.SECRET_TOKEN)
}

// Decode handler
function decodeToken (token) {
    const decoded = new Promise((resolve, reject) => {
        try{
            const playload = jwt.decode(token, config.SECRET_TOKEN)

            if (playload.exp < moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            resolve(playload.sub)
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}