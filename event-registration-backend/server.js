import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';


dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

connectDB();
app.use(cors());
app.use(express.json());


app.get('/', (req,res)=>{
    res.send("welcome to event registration system")
})

app.listen(PORT, ()=>{
    console.log(`server is running on port http://localhost:${PORT}`)
})