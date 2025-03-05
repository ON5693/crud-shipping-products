import fastify from 'fastify';
import swagger from '@fastify/swagger';
import ordersRoutes from './routes/orders.routes';
import swaggerUi from '@fastify/swagger-ui';
import { options } from './utils/swagger';

export async function buildApp() {
  const app = fastify({ logger: true });

  app.register(swagger, options);
  app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    }
  });
  
  // Register routes
  app.register(ordersRoutes, { prefix: '/orders' });

  app.addHook('preHandler', (_, res, done) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "*");

      done();
  }) 

  return app;
}