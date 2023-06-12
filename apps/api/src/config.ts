import dotenv from "dotenv";

export type Config = {
  DATABASE_URL: string;
  ELASTIC_USER: string;
  ELASTIC_PASSWORD: string;
  ES_URL: string;
  ELASTIC_CA_FILE: string;
};

const buildConfig = (): Config => {
  const { parsed } = dotenv.config();
  if (!parsed) throw new Error(".env file is missing or empty");
  return parsed as Config;
};

export const config = buildConfig();
