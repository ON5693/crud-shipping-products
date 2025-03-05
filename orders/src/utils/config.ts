
import dotenv from "dotenv";
dotenv.config();

interface ENV {
  PRODUCTS_SERVICE_URL: string | undefined;
  PORT: number | undefined;
  CEP_ORIGIN: string | undefined;
}

interface Config {
  PORT: number;
  PRODUCTS_SERVICE_URL: string;
  CEP_ORIGIN: string;
}

const getConfig = (): ENV => {
  return {
    PRODUCTS_SERVICE_URL: process.env.PRODUCTS_SERVICE_URL,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    CEP_ORIGIN: process.env.CEP_ORIGIN ? process.env.CEP_ORIGIN : '06454-000',
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;