const platoService = require('../services/plato.service');

//let menu = [
    //{ 
        //id: 1, 
        //nombre: 'Lomo saltado',    
        //categoria: 'segundos', 
        //precio: 18, 
        //stock: 3,  
        //disponible: true 
    //},
    //{ 
        //id: 2, 
        //nombre: 'Arroz con pollo', 
        //categoria: 'segundos', 
        //precio: 12, 
        //stock: 5,  
        //disponible: true 
    //},
    //{ 
        //id: 3, 
        //nombre: 'Sopa',            
        //categoria: 'entradas', 
        //precio: 8,  
        //stock: 10, 
        //disponible: true 
    //}
//];

exports.obtenerMenu = async (req, res) => {
    try{
        const platos = await platoService.obtenerTodos();
        res.status(200).json(platos);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.buscarPlato = async (req, res) => {
    try {
        const { nombre } = req.query;
        const { id } = req.params;

        if (nombre) {
            const platos = await platoService.buscarPorNombre(nombre);
            res.status(200).json(platos);
        }

        if (!id || id === 'buscar') {
            return res.status(400).json({ error: 'El parametro nombre es requerido.' });
        }

        const plato = await platoService.buscarPorId(id);
        if (!plato) {
            return res.status(404).json({ error: `Plato con id ${id} no encontrado` });
        }

        res.status(200).json(plato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.buscarCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;

        const platos = await platoService.buscarPorCategoria(categoria);

        if (platos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron platos para esta categoría' });
        }

        return res.status(200).json(platos);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.agregarPlato = async (req, res) => {
    
    try {
        const { nombre, precio, stock, categoria } = req.body;
        if (!nombre || !precio) {
            return res.status(400).json({ error: 'nombre y precio son requeridos' });
        }
        const nuevo = await platoService.crear(req.body);
        res.status(201).json({ message: 'Plato agregado correctamente', plato: nuevo });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el plato' });
    }

};


exports.eliminarPlato = (req, res) => {
    const id = parseInt(req.params.id);
    const index = menu.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ error: `Plato con id ${id} no encontrado` });
    }
    const eliminado = menu.splice(index, 1) [0];
    res.status(200).json({ message: 'Plato eliminado correctamente', eliminado });
}

exports.actualizarPlato = (req, res) => {
    const id = parseInt(req.params.id);
    const plato = menu.find(p => p.id === id);
    if (!plato) {
        return res.status(404).json({ error: `Plato con id ${id} no fue encontrado` });
    }
    const { precio, stock } = req.body;
    if (precio !== undefined && typeof precio !== 'number') plato.precio = precio;
    if (stock !== undefined && typeof stock === 'number') plato.stock = stock;

    res.status(200).json({ message: 'Plato actualizado correctamente', plato });
}