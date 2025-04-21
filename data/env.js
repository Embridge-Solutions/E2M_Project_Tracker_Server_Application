require('dotenv').config();

// create configration objects
let ENV = {};

ENV.APP = process.env.APP;
ENV.PORT = process.env.PORT;

// DATABASE
ENV.DB_DIALECT = process.env.DB_DIALECT;
ENV.DB_HOST = process.env.DB_HOST;
ENV.DB_PORT = process.env.DB_PORT;
ENV.DB_NAME = process.env.DB_NAME;
ENV.DB_USER = process.env.DB_USER;
ENV.DB_PASSWORD = process.env.DB_PASSWORD;

// JWT
ENV.JWT_SECRET = process.env.JWT_SECRET;
ENV.JWT_EXPIRATION = process.env.JWT_EXPIRATION;
ENV.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
ENV.REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;

// TIME ZONE
ENV.TIMEZONE = process.env.TIMEZONE || '+05:30';

module.exports = ENV;
