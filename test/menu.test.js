const { test, describe } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const app = require('../app');

describe('Rutas del menu', () => {
    
    test('GET /menu devuelve 200 y un array', async (t) => {
        const response = await request(app).get('/menu');
        assert.strictEqual(response.statusCode, 200);
        assert.ok(Array.isArray(response.body));
    });

    test('GET /menu/buscar sin nombre= devuelve 400', async (t) => {
        const response = await request(app).get('/menu/buscar');
        assert.strictEqual(response.statusCode, 400);
    });

    test('GET /menu/:id con id invalido devuelve 500', async (t) => {
        const response = await request(app).get('/menu/id-que-no-existe');
        assert.strictEqual(response.statusCode, 500);
    });

    test('GET /menu/categoria/Segundos devuelve 200 y devuelve un array', async (t) => {
        const response = await request(app).get('/menu/categoria/Segundos');
        assert.strictEqual(response.statusCode, 200);
        assert.ok(Array.isArray(response.body));
    });

    test('GET /menu/categoria/:cat con categoría inexistente devuelve 404', async (t) => {
    const response = await request(app).get('/menu/categoria/NoExiste');
    assert.strictEqual(response.status, 404);
    });
});