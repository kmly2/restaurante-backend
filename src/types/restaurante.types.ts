import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export type EstadoPlato = 'disponible' | 'agotado' | 'suspendido'

export type ResultadoOperacion<T> =
    | { ok: true;  datos: T }
    | { ok: false; error: string }

export enum Categoria {
    ENTRADAS = 'Entradas',
    PRINCIPAL = 'Segundos',
    POSTRES = 'Postres',
    BEBIDA = 'Bebidas'
}


export interface Plato {
  _id:        string
  nombre:     string
  categoria:  Categoria
  precio:     number
  stock:      number
  disponible: boolean
}

// Cliente al crear un plato (POST /menu)
export interface CreatePlatoDto extends Plato {
}

// Servidor al cliente (GET /menu)
export interface PlatoResponseDto {
  _id:        string
  nombre:     string
  categoria:  Categoria
  precio:     number
  stock:      number
  disponible: boolean
}

export interface UpdatePlatoDto {
  nombre?:     string
  categoria?:  Categoria
  precio?:     number
  stock?:      number
}

export interface User {
  _id:      string
  email:    string
  password: string
}

export interface RegisterDto {
  email:    string
  password: string
}

export interface LoginDto {
  email:    string
  password: string
}

export interface LoginResponseDto {
  token:   string
  message: string
}

export interface RestaurantePayload {
  email: string,
  iat?: number,
  exp?: number
}

export function esRestaurantePayload (
  valor: unknown
): valor is RestaurantePayload {
  return (
    typeof valor === 'object' &&
    valor !== null &&
    'email' in valor &&
    typeof (valor as RestaurantePayload).email === 'string'
  )
}
  
export interface AuthRequest extends Request {
  user?: RestaurantePayload
}

