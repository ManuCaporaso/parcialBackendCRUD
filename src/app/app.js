const express = require ('express')
const morgan = require("morgan")
const router = require("../router/alumnos.router")

const app = express()
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.send('Esto es express');
})



module.exports = app;