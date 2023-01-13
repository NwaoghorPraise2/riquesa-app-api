import mongoose from 'mongoose';
import {config} from 'dotenv';

config();
const uri = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
   console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
   console.error(err);
});

const connect = async () => {
   mongoose.set('strictQuery', false);
   await mongoose.connect(uri);
};

const disConnected = async () => {
   await mongoose.disconnect();
};

export default {
   connect,
   disConnected,
};

//Refactor this code to bes practice
