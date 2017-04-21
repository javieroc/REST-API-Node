'use strict'

const config = {
    port: process.env.PORT || 3001,
    mongodb: {
        url: "",
        database: ""
    },
    SECRET_TOKEN: ''
}

module.exports = config;
