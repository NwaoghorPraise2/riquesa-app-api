import mongoose from 'mongoose';
import {config} from 'dotenv';

config();
const uri = process.env.MONGO_URL;

const connect = async () => {
   try {
      mongoose.set('strictQuery', false);
      mongoose.connect(uri, {
         useNewUrlParser: true,
      });
      console.log('Connected to MongoDB');
   } catch (err) {
      console.log(err.message);
   }
};

export default {
   connect,
};

//Refactor this code to bes practice
