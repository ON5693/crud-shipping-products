import { FastifyInstance } from 'fastify';
import { createProductHandler, getAllProductsHandler, getProductByIdHandler, updateProductHandler, deleteProductHandler, getShippingHandler } from '../controllers/handlers/products.controllers';
import { addProductSchema, updateProductSchema, getProductByIdSchema, getProductsSchema,shippingProductsSchema } from '../controllers/schemas/products.schemas';

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.post('/', { schema: addProductSchema }, createProductHandler);
  fastify.get('/', { schema: getProductsSchema }, getAllProductsHandler);
  fastify.get('/:id', { schema: getProductByIdSchema }, getProductByIdHandler);
  fastify.post('/:id/shipping', { schema: shippingProductsSchema }, getShippingHandler);
  fastify.patch('/:id', { schema: updateProductSchema }, updateProductHandler);
  fastify.delete('/:id', deleteProductHandler);
}
