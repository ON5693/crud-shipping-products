import { buildApp } from './app';
import config from './utils/config';

const startServer = async () => {
  const app = await buildApp();
  try {
    app.listen({ port: Number(config.PORT), host: '0.0.0.0' });
    console.log(`Server is running on http://localhost:${config.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
startServer();

