const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const verifyToken = require('../middlewares/verifyToken');

const verificarDatosPlato = (req, res, next) => {

    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Middleware: nombre y precio son requeridos' });
    }

    if (precio <= 0) {
        return res.status(400).json({ error: 'Middleware: el precio debe ser mayor a 0' });
    }

    next(); // Si todo está bien, continúa con el siguiente middleware o controlador
};


// GET /menu
router.get('/menu', menuController.obtenerMenu);
 
// GET /menu/buscar?nombre=xxx
router.get('/buscar', menuController.buscarPlato);

// GET /menu/categoria/:categoria
router.get('/categoria/:categoria', menuController.buscarCategoria);

// GET /menu/:id
router.get('/:id', menuController.buscarPlato);

// POST /menu
router.post('/',verifyToken ,menuController.agregarPlato);

// DELETE /menu/:id
router.delete('/:id',verifyToken ,menuController.eliminarPlato);

// PUT /menu/:id
router.put('/:id',verifyToken ,menuController.actualizarPlato);

// 
 
module.exports = router;

