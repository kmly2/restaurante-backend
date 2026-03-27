const authService = require('../services/auth.service');

exports.register = async (req, res) => {
    try {
        await authService.register(req.body);
        res.status(201).json({mensaje : "Administrador registrado"});
    } catch (error) {
            res.status(400).json({"error" : error.message});
    }
}


exports.login = async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json({token});
    } catch (error) {
        res.status(401).json({"error" : error.message});
    }
}


exports.monstrarTodos = async (req, res) => {
    try {
        const usuarios = await authService.mostrarTodos();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({"error" : error.message});
    }
}