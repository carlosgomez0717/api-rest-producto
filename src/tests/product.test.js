import request from 'supertest';
import app from '../app.js';

describe('GET /', () => {
  it('debería responder con el mensaje de bienvenida de la API', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});