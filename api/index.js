import express, { application } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import hotelRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from 'cookie-parser'
const app=express();
dotenv.config()

const connect = async ()=>{
try{
    await mongoose.connect(process.env.MONGO)
    console.log("connected to mongodb");
}catch(error){
    throw error
}
}

mongoose.connection.on('disconnected',()=>{
    console.log('mongodb disconnected');
})
mongoose.connection.on('connected',()=>{
    console.log('mongodb connected');
})

//middlewares
app.use(cookieParser())

app.use(express.json());

app.use('/api/auth',authRoute)
app.use('/api/hotels',hotelRoute)
app.use('/api/rooms',roomsRoute)
app.use('/api/users',usersRoute)

app.use((req,res,next)=>{
    console.log("hi i m middleware");
})

app.listen(5000,()=>{
    connect();
    console.log("connected to backend")
})