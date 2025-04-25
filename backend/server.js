import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
// connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes); 

const PORT = process.env.PORT || 5000;

console.log('process.env.MONGO_URI: ', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.error("DB Error:", err.message));app.listen(PORT, () => console.log(`Server running on port ${PORT}`));