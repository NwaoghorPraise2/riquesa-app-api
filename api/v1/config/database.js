import mongoose from 'mongoose';
import {config} from 'dotenv';

config();

const connect = async () => {
   try {
      const uri = process.env.MONGO_URL;
      mongoose.set('strictQuery', false);
      mongoose.connect(uri);
      console.log('Connected to MongoDB');
   } catch (err) {
      console.log(err.message);
      process.exit(1);
   }
};

export default connect;

//Refactor this code to bes practice
