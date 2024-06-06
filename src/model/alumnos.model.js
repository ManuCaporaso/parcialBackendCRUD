const { Sequelize, DataTypes,} = require("sequelize");

const sequelize = new Sequelize('prueba_sequelize', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    port: 3307
});


const alumno = sequelize.define('alumno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    tableName: 'alumnos', // Nombre de la tabla en la base de datos
    timestamps: false     // Deshabilita los timestamps (createdAt y updatedAt)
});


module.exports = alumno;





async function testConection(){
    try{
        sequelize.authenticate();
        console.log("La base de datos se conecto correctamente")
    }catch (error){
        console.error("La base datos no conecto correctamente", error)
    }
}

testConection ();

