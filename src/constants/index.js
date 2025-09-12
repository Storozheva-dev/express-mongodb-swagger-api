import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
const ONE_DAY = 24 * 60 * 60 * 1000;
export const THIRTY_DAYS = 30 * ONE_DAY;

export const SMTP = {
  HOST: process.env.SMTP_HOST,
  PORT: Number(process.env.SMTP_PORT) || 587,
  USER: process.env.SMTP_USER,
  PASSWORD: process.env.SMTP_PASSWORD,
  FROM: process.env.SMTP_FROM,
};

export const MONGODB = {
  USER: process.env.MONGODB_USER,
  PASSWORD: process.env.MONGODB_PASSWORD,
  URL: process.env.MONGODB_URL,
  DB: process.env.MONGODB_DB,
};

export const APP = {
  DOMAIN: process.env.APP_DOMAIN,
  PORT: Number(process.env.PORT) || 3000,
};

export const JWT = {
  SECRET: process.env.JWT_SECRET,
};

// шаблон
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

// фото
export const CLOUDINARY = {
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
};

// сваггер
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
