import { FastifyInstance } from 'fastify';
import { addOrderSchema } from '../controllers/schemas/orders.schemas';
import { addOrderHandler, estimateShippingHandler } from '../controllers/handlers/orders.controllers';

export default async function orderRoutes(fastify: FastifyInstance) {
  fastify.post('/:id', { schema: addOrderSchema }, addOrderHandler);
  fastify.get('/:id/shipping/:destination', estimateShippingHandler);
}
