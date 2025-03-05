import fastify from 'fastify';
import swagger from '@fastify/swagger';
import { getDb } from './utils/database';
import productRoutes from './routes/products.routes';
import swaggerUi from '@fastify/swagger-ui';
import { options } from './utils/swagger';

export async function buildApp() {
  const app = fastify({ logger: true });

  const { dbClient} = await getDb();

  app.register(swagger, options);
  app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    }
  });
  
  // Register routes
  app.register(productRoutes, { prefix: '/products' });

  app.addHook('onClose', async () => {
    console.log('server closed!')
    return dbClient.close()
})
  app.addHook('preHandler', (_, res, done) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "*");

      done();
  }) 

  return app;
}