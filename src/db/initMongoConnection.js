import mongoose from 'mongoose';
import 'dotenv/config';

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB: ${error.message}');
  }
};
