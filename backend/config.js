import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 8080
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/nodesample_db'
export const SECRET = process.env.SECRET || 'secret'
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:8081'