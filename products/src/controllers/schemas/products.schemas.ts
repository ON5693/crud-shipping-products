const productsSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    price: { type: 'number'},
    decription: { type: 'string' },
    stock: { type: 'integer' },
    weight: { type: 'number' },
    dimensions: { 
      type: 'object', 
      properties: {
        width: { type: 'number' },
        height: { type: 'number' },
        length: { type: 'number' },
      }
    },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
}

export const getProductsSchema = {
  description: 'List of all products',
  tags: ['products'],
  summary: 'Get all products',
  response: {
    200: {
      description: 'Successful response',
      type: 'array',
      items: productsSchema,
    },
  },
}

export const getProductByIdSchema = {
  description: 'Product information',
  tags: ['products'],
  summary: 'Get product by id',
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'productId',
      },
    },
    required: ['id'],
  },
  response: {
    200: {
      description: 'Successful response',
      ...productsSchema
    },
  },
}

export const addProductSchema = {
	description: 'Create a new product',
	tags: ['products'],
	summary: 'Creates new product with given values',
	body: {
		type: 'object',
    properties: {
      name: { type: 'string' },
      price: { type: 'number'},
      decription: { type: 'string' },
      stock: { type: 'integer' },
      weight: { type: 'number' },
      dimensions: { 
        type: 'object', 
        properties: {
          width: { type: 'number' },
          height: { type: 'number' },
          length: { type: 'number' },
        }
      },
    },
	},
	response: {
		200: {
			description: 'Successful response',
			...productsSchema
		},
	},
}

export const updateProductSchema = {
	description: 'Updates existing product',
	tags: ['products'],
	summary: 'Updates product by Id with given values',
	params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'product Id'
			}
		}
	},
	body: {
		type: 'object',
		properties: {
      name: { type: 'string' },
      price: { type: 'number'},
      decription: { type: 'string' },
      stock: { type: 'integer' },
      weight: { type: 'number' },
      dimensions: { 
        type: 'object', 
        properties: {
          width: { type: 'number' },
          height: { type: 'number' },
          length: { type: 'number' },
        }
      },
    },
	},
	response: {
		200: {
			description: 'Successful response',
			...productsSchema
    }
	},
}

export const shippingProductsSchema = {
  description: 'Shipping informations',
  tags: ['products'],
  summary: 'Info about shipping',
  params: {
		type: 'object',
		properties: {
			id: {
				type: 'string',
				description: 'product Id'
			}
		}
	},
  body: {
		type: 'object',
    properties: {
      from: { type: 'string' },
      to: { type: 'string'},
    },
	},
  response: {
    200: {
      description: 'Successful response',
    },
  },
}