const express = require ('express');
const morgan = require("morgan");
const cors = require('cors');

const router = require("../router/productos.router");

const app = express()

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('Esto es express y funciona');
});


app.use('/api/', router);



module.exports = app;