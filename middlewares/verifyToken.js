const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const verifyToken = (req, res, next) => {
    try {

        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ error: "No token enviado" });            
        }
        
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, jwtSecret);
        req.usuario = decoded;
        next();

    } catch (error){
        res.status(401).json({ error: "Token invalido o expirado" });
    }
}

module.exports = verifyToken;