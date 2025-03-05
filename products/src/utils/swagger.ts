import config from "./config";

export const options = {
	routePrefix: '/docs',
	exposeRoute: true,
	swagger: {
		info: {
			title: 'Shipping Products API',
			description: 'Building a fast REST API with Node.js, MongoDB, Fastify and Swagger',
			version: '1.0.0',
		},
		externalDocs: {
			url: 'https://swagger.io',
			description: 'Find more info here',
		},
		host: `localhost:${config.PORT}`,
		schemes: ['http'],
		consumes: ['application/json'],
		produces: ['application/json']
	},
};
