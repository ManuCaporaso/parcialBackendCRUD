const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize('parcialBackend', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    port: 3306
});

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'productos',
    timestamps: false,
});

module.exports = Producto;


(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        // Esto creará la tabla si no existe (y no hará nada si ya existe)
        await Producto.sync();
        console.log('Table "Productos" sincronizada correctamente.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();



module.exports = Producto;






async function testConection(){
    try{
        sequelize.authenticate();
        console.log("La base de datos se conecto correctamente")
    }catch (error){
        console.error("La base datos no conecto correctamente", error)
    }
}

testConection ();

