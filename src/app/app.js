const express = require ('express')
const morgan = require("morgan")
const router = require("../router/alumnos.router")

const app = express()
// Middleware para logging
app.use(morgan('dev'));

// Middleware para procesar JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('Esto es express');
});

// Usar el router de alumnos para las rutas /api/v1/ alumnos
app.use('/api/v1', router);




module.exports = app;