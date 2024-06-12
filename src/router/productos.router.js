const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const Producto = require('../model/productos.model');


// Obtener todos los productos
router.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Obtener un producto por id
router.get('/productos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id);
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});


// Crear un nuevo producto
router.post('/productos', async (req, res) => {
    const { nombre, precio, cantidad, categoria } = req.body;

    try {
        const nuevoProducto = await Producto.create({ nombre, precio, cantidad, categoria });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});


// Actualizar un producto por id
router.put('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, cantidad, categoria } = req.body;

    try {
        const producto = await Producto.findByPk(id);
        if (producto) {
            producto.nombre = nombre;
            producto.precio = precio;
            producto.cantidad = cantidad;
            producto.categoria = categoria;
            await producto.save();
            res.status(200).json(producto);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

// Eliminar un producto por id
router.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id);
        if (producto) {
            await producto.destroy();
            res.status(200).json({ message: 'Producto eliminado' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

// Obtener productos ordenados
router.get('/productos/ordenados', async (req, res) => {
    const { criterio } = req.query;

    try {
        const productos = await Producto.findAll({
            order: [[criterio, 'ASC']]
        });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos ordenados' });
    }
});

// Obtener productos filtrados
router.get('/productos/filtrados', async (req, res) => {
    const { precio, categoria } = req.query;
    let whereClause = {};

    if (precio) {
        whereClause.precio = { [Op.gt]: precio };
    }
    if (categoria) {
        whereClause.categoria = categoria;
    }

    try {
        const productos = await Producto.findAll({ where: whereClause });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos filtrados' });
    }
});

module.exports = router;