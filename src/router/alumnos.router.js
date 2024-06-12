const express = require('express');
const router = express.Router();
const Alumnos = require('../model/alumnos.model');
const { Op } = require('sequelize');

// Ruta para obtener todos los alumnos
router.get('/alumnos', async (req, res) => {
    try {
        const alumnos = await Alumnos.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: alumnos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error obteniendo los alumnos',
            error: error.message
        });
    }
});

// Ruta para obtener un alumno por ID
router.get('/alumnos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const alumno = await Alumnos.findByPk(id);
        if (!alumno) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Alumno no encontrado'
            });
        }
        res.status(200).json({
            ok: true,
            status: 200,
            body: alumno
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error obteniendo el alumno',
            error: error.message
        });
    }
});

// Nueva ruta para buscar alumnos por nombre
router.get('/alumnos/nombre/:nombre', async (req, res) => {
    const { nombre } = req.params;
    try {
        const alumnos = await Alumnos.findAll({
            where: {
                nombre: {
                    [Op.like]: `%${nombre}%`
                }
            }
        });
        if (alumnos.length === 0) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'No se encontraron alumnos con ese nombre'
            });
        }
        res.status(200).json({
            ok: true,
            status: 200,
            data: alumnos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error buscando alumnos por nombre',
            error: error.message
        });
    }
});



// Ruta para crear un alumno
router.post('/alumnos', async (req, res) => {
    const { apellido, nombre, activo } = req.body;

    try {
        const createAlumnos = await Alumnos.create({
            apellido,
            nombre,
            activo
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: 'Alumno Creado Correctamente',
            data: createAlumnos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error creando el alumno',
            error: error.message
        });
    }
});

// Ruta para actualizar un alumno
router.put('/alumnos/:id', async (req, res) => {
    const { id } = req.params;
    const { apellido, nombre, activo } = req.body;

    try {
        const alumno = await Alumnos.findByPk(id);

        if (!alumno) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Alumno no encontrado'
            });
        }

        alumno.apellido = apellido || alumno.apellido;
        alumno.nombre = nombre || alumno.nombre;
        alumno.activo = activo !== undefined ? activo : alumno.activo;

        await alumno.save();

        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Alumno Actualizado Correctamente',
            data: alumno
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error actualizando el alumno',
            error: error.message
        });
    }
});

// Ruta para eliminar un alumno
router.delete('/alumnos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const alumno = await Alumnos.findByPk(id);

        if (!alumno) {
            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Alumno no encontrado'
            });
        }

        await alumno.destroy();

        res.status(200).json({
            ok: true,
            status: 200,
            message: 'Alumno Eliminado Correctamente'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: 'Error eliminando el alumno',
            error: error.message
        });
    }
});

module.exports = router;
