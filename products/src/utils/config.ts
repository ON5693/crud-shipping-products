import dotenv from "dotenv";
dotenv.config();

interface ENV {
  DB_USER: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_HOST: string | undefined;
  DB_PORT: number | undefined;
  DB_NAME: string | undefined;
  DB_URI: string | undefined;
  PORT: number | undefined;
  COST_PER_KG: number | undefined;
  COST_PER_DISTANCE: number | undefined;
}

interface Config {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  PORT: number;
  DB_URI: string;
  COST_PER_KG: number;
  COST_PER_DISTANCE: number;
}

const getConfig = (): ENV => {
  return {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    DB_URI: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    COST_PER_KG: process.env.COST_PER_KG ? Number(process.env.COST_PER_KG) : 2,
    COST_PER_DISTANCE: process.env.COST_PER_DISTANCE ? Number(process.env.COST_PER_DISTANCE) : 4,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;