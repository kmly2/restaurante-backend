import { Plato, CreatePlatoDto } from '../types/restaurante.types';
const PlatoModel = require('../../models/Plato')


export class PlatoService {
    async crear(data: CreatePlatoDto) : Promise<Plato> {
    const plato = new PlatoModel(data);
    return await plato.save();
    }

    async obtenerTodos(): Promise<Plato[]> {
        return await PlatoModel.find({});
    }

    async buscarPorId(id: string): Promise<Plato | null> {
        return await PlatoModel.findById(id);
    }

    async buscarPorNombre(nombre: string): Promise<Plato | null> {
        return await PlatoModel.findOne({ nombre });
    }

    async buscarPorCategoria(categoria: string): Promise<Plato[]> {
        return await PlatoModel.find({ categoria });
    }

    async actualizar(id: string, data: Partial<CreatePlatoDto>): Promise<Plato | null> {
        return await PlatoModel.findByIdAndUpdate(id, data, { new: true });
    }

    async eliminar(id: string): Promise<Plato | null> {
        return await PlatoModel.findByIdAndDelete(id);
    }
   
}


export const platoService = new PlatoService();