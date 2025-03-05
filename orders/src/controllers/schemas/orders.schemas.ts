export const addOrderSchema = {
	description: 'Adding order for a product',
	tags: ['products'],
	summary: 'Adding a order',
	body: {
		type: 'object',
    properties: {
      quantity: { type: 'number' },
      additionalInfo: { type: 'string' },
    },
	},
	response: {
		200: {
			description: 'Successful response',
		},
	},
}