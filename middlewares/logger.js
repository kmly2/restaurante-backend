const logger = (req, res, next) => {
    const ahora = new Date().toLocaleTimeString();
    console.log(`[${ahora}] ${req.method} ${req.url}`);
    next(); // Si no la usamos la petición se dentendrá aquí
}

module.exports = logger;