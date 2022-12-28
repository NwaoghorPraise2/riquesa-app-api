const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
   try {
      const uri = process.env.MONGO_URL;
      mongoose.set('strictQuery', false);
      mongoose.connect(uri);
      return 'Connected to MongoDB';
   } catch (err) {
      return err.message;
   }
};

module.exports = connect;
