import { FastifyRequest, FastifyReply } from 'fastify';
import { addOrderHandler, estimateShippingHandler } from '../src/controllers/handlers/orders.controllers';
import { addOrder, shippingOrder } from '../src/service/orders.service';
import { OrdersDto } from '../src/service/types/types';
import { faker } from '@faker-js/faker';

jest.mock('../src/service/orders.service');

describe('Orders Controllers', () => {
    let mockRequest: Partial<FastifyRequest>;
    let mockReply: Partial<FastifyReply>;

    beforeEach(() => {
        mockReply = {
            code: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
    });

    describe('addOrderHandler', () => {
        it('should create an order successfully', async () => {
            const id = faker.database.mongodbObjectId();
            mockRequest = {
                params: { id },
                body: { quantity: 2, additionalInfo: 'test' } as OrdersDto
            };

            (addOrder as jest.Mock).mockResolvedValueOnce(undefined);

            await addOrderHandler(mockRequest as FastifyRequest, mockReply as FastifyReply);

            expect(addOrder).toHaveBeenCalledWith(id, { quantity: 2, additionalInfo: 'test' });
            expect(mockReply.code).toHaveBeenCalledWith(201);
            expect(mockReply.send).toHaveBeenCalledWith('Order created successfully');
        });

        it('should handle errors', async () => {
            mockRequest = {
                params: { id: faker.database.mongodbObjectId() },
                body: { quantity: 2, additionalInfo: 'test' } as OrdersDto
            };

            const error = new Error('Something went wrong');
            (addOrder as jest.Mock).mockRejectedValueOnce(error);

            await addOrderHandler(mockRequest as FastifyRequest, mockReply as FastifyReply);

            expect(mockReply.code).toHaveBeenCalledWith(500);
            expect(mockReply.send).toHaveBeenCalledWith(error);
        });
    });

    describe('estimateShippingHandler', () => {
        it('should return shipping estimate successfully', async () => {
            const id = faker.database.mongodbObjectId();
            mockRequest = {
                params: { id, destination: '01310100' }
            };

            const shippingEstimate = { cost: '10,50 BRL', estimatedDays: '2 days' };
            (shippingOrder as jest.Mock).mockResolvedValueOnce(shippingEstimate);

            const result = await estimateShippingHandler(mockRequest as FastifyRequest, mockReply as FastifyReply);

            expect(shippingOrder).toHaveBeenCalledWith(id, '01310100');
            expect(result).toEqual(shippingEstimate);
        });

        it('should return 400 if destination is missing', async () => {
            mockRequest = {
                params: { id: '1', destination: '' }
            };

            await estimateShippingHandler(mockRequest as FastifyRequest, mockReply as FastifyReply);

            expect(mockReply.code).toHaveBeenCalledWith(400);
            expect(mockReply.send).toHaveBeenCalledWith({ message: 'Invalid shipping details' });
        });
    });
});