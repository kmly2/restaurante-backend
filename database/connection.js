const mongoose = require('mongoose');
const { mongoUri } = require('../config');

const conectarDB = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB conectado - restaurante');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error.message);
        process.exit(1); // Salir con error
    }
};

module.exports = conectarDB;