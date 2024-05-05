import express from "express"
import cors from "cors"
import {connectDB} from './config/db.js'
import router from './routes/routes.js'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
const app=express();
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api',router);



app.listen(3000 ,(x)=>{ 
    console.log("listening");
    console.log(3000);
});
