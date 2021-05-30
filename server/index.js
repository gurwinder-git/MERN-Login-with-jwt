import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/auth.js';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config({path: './config.env'})
const PORT = process.env.PORT||4000;
const url = process.env.URL;

//mongoDB Connection
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).then(() => console.log('connection successfull')).catch((err) => console.error(err.message));

//middleware
app.use(express.json());
app.use(cookieParser());

//End Points
app.use('/',router)

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

