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

// Obtener todos los Productos Ordenados
exports.getAllProductosOrdered = async (req, res) => {
    const {criterio} = req.params
    try {
        const Productos = await Producto.findAll();
        switch (criterio) { 
            case 'precio':
                Productos.sort((a, b) => a.dataValues.precio - b.dataValues.precio);
                break;
            case 'nombre':
                Productos.sort((a, b) => a.dataValues.nombre.localeCompare(b.dataValues.nombre));
                break;
            case 'cantidad':
                Productos.sort((a, b) => a.dataValues.cantidad - b.dataValues.cantidad);
                break;   
                     
        }  

        res.status(200).json({
            ok: true,
            data: Productos,
            msg: "Estos son los Productos Ordenados"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los Productos' });
    }
};

// Obtener todos los Productos Filtrados
exports.getAllProductosFiltered = async (req, res) => {
    const {criterio} = req.params
    const {valor} = req.query

    try {
        let Productos = await Producto.findAll();

        switch (criterio) { 
            case 'precioMayor':
          
                Productos = Productos.filter(p=>p.dataValues.precio>=valor)
                break;
            case 'categoria':
                Productos = Productos.filter(p=>p.dataValues.categoria==valor)
                break;   
                        
        }  
        if (Productos.length>0) 
            res.status(200).json({
                ok: true,
                data: Productos,
                msg: "Estos son los Productos de acuerdo al filtro"
            });
        else 
            res.status(404).json({
                ok: false,
                msg: "No se encontraron productos con el criterio enviado"
            }); 

    } catch (error) {

        res.status(500).json({ error: 'Error al obtener los Productos' });
    }
};

module.exports = router;