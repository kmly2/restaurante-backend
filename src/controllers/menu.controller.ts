import {Request, Response} from 'express'
import {platoService} from '../services/plato.services'
import {CreatePlatoDto, UpdatePlatoDto} from '../types/restaurante.types'

//GET /menu - Obtener todos los platos
export const obtenerMenu = async (
    req: Request, 
    res: Response
): Promise<void> => {
    try {
        const platos = await platoService.obtenerTodos();
        res.status(200).json(platos);
    } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : 'Error interno'
        res.status(500).json({ error: mensaje })
    }
}

//GET /menu/ buscar plato por :id o por nombre
export const buscarPlato = async (
req: Request<{ id: string }, {}, {}, { nombre?: string }>,
res: Response
): Promise<void> => {
    try {
        // Si viene ?nombre= en la URL
         if (req.query.nombre) {
            const platos = await platoService.buscarPorNombre(req.query.nombre)
            res.status(200).json(platos)
            }
        // Si no hay nombre, valida que haya id
        if (!req.params.id || req.params.id === 'buscar') {
            res.status(400).json({ error: 'El parámetro nombre es obligatorio' })
            return
            }
        // Busca por id
        const plato = await platoService.buscarPorId(req.params.id)
        if (!plato) {
            res.status(404).json({ error: 'Plato no encontrado' })
            return
            }
            res.status(200).json(plato)
        
    } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : 'Error interno'
        res.status(500).json({ error: mensaje })
    }
};

//GET /menu/categoria/:categoria - Buscar platos por categoría
export const buscarPlatosPorCategoria = async (
    req: Request<{ categoria: string }>,
    res: Response
): Promise<void> => {
    try {
        const { categoria } = req.params;
        if (categoria) {
            const platos = await platoService.buscarPorCategoria(categoria)
            if(platos.length > 0)
                res.status(200).json(platos)
            else                
                res.status(404).json({ error: 'No se encontraron platos para esta categoría' })
            return;
            }
    } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : 'Error interno'
        res.status(500).json({ error: mensaje })
    }
};

//POST/menu - Crear un nuevo plato (Protegido con JWT)
export const agregarPlato = async (
    req: Request<{}, {}, CreatePlatoDto>,
    res: Response
): Promise<void> => {
    try {
    const { nombre, precio } = req.body;
        if (!nombre || !precio) {
            res.status(400).json({ error: 'nombre y precio son obligatorios' });
            return;
        }
        const nuevo = await platoService.crear(req.body);
        res.status(201).json({ mensaje: 'Plato creado', plato: nuevo }

        );
    } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : 'Error interno'
        res.status(500).json({ error: mensaje })
    }
}    

//DEETE /menu/:id - Eliminar un plato por su ID (Protegido con JWT)
export const eliminarPlato = async (
    req: Request<{ id: string }>,
    res: Response
): Promise<void> => {
    try{
        const eliminado = await platoService.eliminar(req.params.id);
        if (!eliminado) {
        res.status(404).json({ error: 'Plato no encontrado' });
        return;
        }
        res.status(200).json({ mensaje: 'Plato eliminado', eliminado });
    } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : 'Error interno'
        res.status(500).json({ error: mensaje })
    }
};

//PUT /menu/:id - Actualizar un plato por su ID (Protegido con JWT)
export const actualizarPlato = async (
    req: Request<{ id: string }, {}, UpdatePlatoDto>,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const plato = await platoService.actualizar(id, req.body);
        if (!plato) {
            res.status(404).json({ error: 'Plato no encontrado' });
            return;
            }
        res.status(200).json({ mensaje: 'Plato actualizado', plato });
    } catch (error: unknown) {
        const mensaje = error instanceof Error ? error.message : 'Error interno'
        res.status(500).json({ error: mensaje })
    }
};