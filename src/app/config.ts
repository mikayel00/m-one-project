import * as process from 'process';
const configs = () => ({
  GLOBAL: {
    PORT: process.env.PORT || 3000,
  },
  POSTGRES: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
  SECRET_JWT: process.env.SECRET_JWT,
  EXPIRE_JWT: process.env.EXPIRE_JWT,
});
export default configs;
