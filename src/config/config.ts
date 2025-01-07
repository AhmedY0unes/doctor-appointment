import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const configSchema = z.object({
  port: z.number().default(3000),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  database: z.object({
    uri: z.string().default('mongodb://localhost:27017/doctor-appointments'),
  }),
  doctor: z.object({
    id: z.string().default('550e8400-e29b-41d4-a716-446655440000'),
    name: z.string().default('Dr. John Doe'),
  }),
});

export type Config = z.infer<typeof configSchema>;

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: (process.env.NODE_ENV as Config['nodeEnv']) || 'development',
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/doctor-appointments',
  },
  doctor: {
    id: process.env.DOCTOR_ID || '550e8400-e29b-41d4-a716-446655440000',
    name: process.env.DOCTOR_NAME || 'Dr. John Doe',
  },
};
