const router = require("express").Router();

const Alumnos = require("../model/alumnos.model")

router.get("/alumnos", async (req, res) => {
    const Alumnos = await Alumnos.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: Alumnos
    })
});

router.get("/alumno", (req, res) => {
    res.send("Yo soy una ruta")
});

router.post("/alumnos/crear", async (req, res) => {
    const { nombre, apellido, activo } = req.body;

    try {
        await Alumnos.sync();
        const createAlumnos = await Alumnos.create({
            nombre,
            apellido,
            activo
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Alumno Creado",
            data: createAlumnos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: "Error creando el alumno",
            error: error.message
        });
    }
});

router.put("/alumnos/editar", (req, res) => {
    res.send("Yo soy una ruta")
});

router.delete("/alumnos/borrar", (req, res) => {
    res.send("Yo soy una ruta")
});


module.exports = router;