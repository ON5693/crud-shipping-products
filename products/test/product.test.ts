// tests/product.test.ts
import fastify from 'fastify';
import mongoose from 'mongoose';
import productRoutes from '../src/routes/products.routes';
import config from '../src/utils/config';

describe('Product Routes', () => {
  const app = fastify();
  app.register(productRoutes, { prefix: '/products' });

  beforeAll(async () => {
    await mongoose.connect(config.DB_URI || 'mongodb://localhost:27017/test', { authSource: 'admin', directConnection: true });
  });

  afterAll(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
  });

  it('should create a product', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/products',
      payload: {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
        weight: 2.6,
        dimensions: {
          length: 10,
          width: 5,
          height: 3,
        },
      },
    });
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body).name).toBe('Test Product');
  });

  it('should fetch all products', async () => {
    const response = await app.inject({ method: 'GET', url: '/products' });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(JSON.parse(response.body))).toBe(true);
  });

  it('should fetch a single product', async () => {
    const product = await app.inject({
      method: 'POST',
      url: '/products',
      payload: {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
        weight: 2.6,
        dimensions: {
          length: 10,
          width: 5,
          height: 3,
        },
      },
    });
    const productId = JSON.parse(product.body)._id;
    const response = await app.inject({ method: 'GET', url: `/products/${productId}` });
    expect(response.statusCode).toBe(200);
  });

  it('should delete a product', async () => {
    const product = await app.inject({
      method: 'POST',
      url: '/products',
      payload: {
        name: 'Delete Product',
        description: 'To be deleted',
        price: 100,
        stock: 10,
        weight: 2.6,
        dimensions: {
          length: 10,
          width: 5,
          height: 3,
        },
      },
    });
    const productId = JSON.parse(product.body)._id;
    const deleteResponse = await app.inject({ method: 'DELETE', url: `/products/${productId}` });
    expect(deleteResponse.statusCode).toBe(200);
  });
});