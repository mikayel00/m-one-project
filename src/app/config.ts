import * as process from 'process';
const configs = () => ({
  GLOBAL: {
    PORT: process.env.PORT || 3000,
  },
  MONGODB: {
    URL: process.env.MONGODB_URL,
  },
  SECRET_JWT: process.env.SECRET_JWT,
  EXPIRE_JWT: process.env.EXPIRE_JWT,
});
export default configs;
