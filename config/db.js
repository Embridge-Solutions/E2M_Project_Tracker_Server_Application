const { db } = require('../models');
const ENV = require('../data/env');

const connectDB = async () => {
  try {
    db.sequelize
      .authenticate()
      .then(() => {
        console.log('Connected to SQL database:', ENV.DB_NAME);
        // if (ENV.APP === 'development') {
        //   db.sequelize.sync(); //creates table if they do not already exist
        // }
      })
      .catch((err) => {
        console.error('Unable to connect to SQL database:', ENV.DB_NAME, err);
      });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
