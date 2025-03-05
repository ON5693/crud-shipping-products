import { FastifyRequest, FastifyReply } from 'fastify';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../../service/products.service';
import { calculateShipping } from '../../service/shipping.service';
import { ProductDto, ShippingInfo } from '../../service/types';

export const createProductHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const product = request.body as ProductDto;
    const result = await createProduct(product);
    reply.code(201).send(result);
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const getAllProductsHandler = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const products = await getAllProducts();
    reply.send(products);
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const getProductByIdHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const product = await getProductById(id);
    if (!product) return reply.code(404).send({ message: 'Product not found' });
    reply.send(product);
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const updateProductHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const payload = request.body as Partial<ProductDto>;
    const product = await updateProduct(id, payload);
    if (!product) return reply.code(404).send({ message: 'Product not found' });
    reply.send(product);
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const deleteProductHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const product = await deleteProduct(id);
    if (!product) return reply.code(404).send({ message: 'Product not found' });
    reply.send({ message: 'Product deleted' });
  } catch (error) {
    reply.code(500).send(error);
  }
};

export const getShippingHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = request.params as { id: string };
    const payload = request.body as ShippingInfo;
    if (!payload.from) return reply.code(400).send({ message: 'Invalid shipping details' });
    
    const product = await getProductById(id);
    if (!product) return reply.code(404).send({ message: 'Product not found' });

    const estimate = calculateShipping(product, payload);
    reply.send(estimate);
  } catch (error) {
    reply.code(500).send(error);
  }
};