require('dotenv').config();

const config = {
  app: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel_manager',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_jwt_secret',
    expiresIn: process.env.JWT_EXPIRATION || '1d'
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10)
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*'
  }
};

module.exports = config; 