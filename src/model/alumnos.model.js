const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize('prueba_sequelize', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    port: 3306
});

const Alumnos = sequelize.define('Alumno', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
        allowNull: false
    }
}, {
    tableName: 'alumnos',
    timestamps: false
});


(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        // Esto creará la tabla si no existe (y no hará nada si ya existe)
        await Alumnos.sync();
        console.log('Table "Alumnos" synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = Alumnos;






async function testConection(){
    try{
        sequelize.authenticate();
        console.log("La base de datos se conecto correctamente")
    }catch (error){
        console.error("La base datos no conecto correctamente", error)
    }
}

testConection ();

