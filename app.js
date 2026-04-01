const express = require('express');
const menuRouter = require('./routes/menu.routes');
const logger = require('./middlewares/logger');
const conectarDB = require('./database/connection');
const authRouter = require('./routes/auth.routes');
const { port } = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');


// Conectar a la base de datos
conectarDB();

const app = express();


const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS bloqueado: ${origin} no está permitido.`));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());
app.use(logger); // Se ejecutará en cada petición, antes de llegar a las rutas
app.use('/auth', authRouter);


// Conectar al router de menú
app.use('/api', menuRouter);

// Bienvenida - Ruta
app.get('/', (req, res) => {
    res.status(200).json({
        mensaje: 'Restaurante Node API',
        version: '2.0.0',
        rutas: ['/menu']
    });
});


module.exports = app;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Restaurante corriendo en http://localhost:${port}`);
    });
}




