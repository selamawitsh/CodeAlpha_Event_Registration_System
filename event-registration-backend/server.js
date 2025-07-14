import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
import eventRoutes from './routes/event.route.js';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();


connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.listen(PORT, ()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})