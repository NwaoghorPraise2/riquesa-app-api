const mongoose = require('mongoose');
const { config } = require('dotenv');

config();

const connect = async () => {
  try {
    const uri = process.env.MONGO_URL;
    mongoose.set('strictQuery', false);
    mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connect;
