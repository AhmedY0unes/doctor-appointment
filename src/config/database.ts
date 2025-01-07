import mongoose from 'mongoose';
import { config } from './config';

export async function connectDB(): Promise<void> {
  try {
    const conn = await mongoose.connect(config.database.uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}
