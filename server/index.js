import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/auth.js';

const app = express();

dotenv.config({path: './config.env'})
const PORT = process.env.PORT;
const url = process.env.URL;

//mongoDB Connection
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).then(() => console.log('connection successfull')).catch((err) => console.error(err.message));

//middleware
app.use(express.json());

function middleware(req,res,next){
    console.log('middelware');
    next();
}

//End Points

app.use('/',router)

app.get('/about', middleware, (req, res)=>{
    res.send('about page');
})

app.listen(3000, ()=> console.log(`Server running on port ${PORT}`));
