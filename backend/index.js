import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from 'express'
import User from './routes/User.js'
import Chat from './routes/Chat.js'
import Ticket from './routes/Ticket.js'
import WidgetConfig from "./routes/WidgetConfig.js";
import  './cronjob.js'


dotenv.config({ path: "./.env.development" });

const port = process.env.PORT||5000
const app = express()

app.use(express.json())
app.use(cookieParser())
const allowedOrigins = ['http://localhost:5173','https://hubly-mxct.vercel.app','https://your-frontend.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({extended:true}))


app.use('/api/users',User)
app.use('/api/config',WidgetConfig)
app.use('/api/chats',Chat)
app.use('/api/tickets',Ticket)

const connectToMongoDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to mongodb");
        
    } catch (error) {
       console.log(error);
        
    }
}

console.log("MONGODB_URI:", process.env.MONGODB_URI);
connectToMongoDb();

app.listen(port,()=>{
  console.log(`App is listening to port ${port}`);
  
})
app.get("/", (req, res) => {
  res.send("Server is working!");
});