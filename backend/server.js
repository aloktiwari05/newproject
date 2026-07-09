import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/authRoutes.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOption = {origin: process.env.ORIGIN, credentials: true,}

app.use(express.json())
app.use(cors(corsOption))
app.use('/api/',userRoutes)

app.get('/', (req,res) => {
    res.json({message: "Hello Developer"})
})

const startServer = () =>{
    try{
    app.listen(port, (req,res)=>{
    console.log(`Server listening on http://localhost:${port}`)
})

}catch(err){
    console.log(err)
}}


startServer();
