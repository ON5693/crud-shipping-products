import { FastifyRequest, FastifyReply } from 'fastify';
import { OrdersDto } from '../../service/types/types';
import { shippingOrder, addOrder } from '../../service/orders.service';

export const addOrderHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const order = request.body as OrdersDto;
    await addOrder(id, order);
    reply.code(201).send('Order created successfully');
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const estimateShippingHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id, destination } = request.params as { id: string, destination: string };
    if (!destination) return reply.code(400).send({ message: 'Invalid shipping details' });

    return shippingOrder(id, destination);
  } catch (error) {
    reply.code(500).send(error);
  }
};