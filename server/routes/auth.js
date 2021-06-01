import express, { response } from 'express';
import User from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import {authenticate} from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello world');
})

router.post('/register', async (req, res)=>{
    // console.log(req.body);
    const {name, email, phone, work, passwordHash, conformPassword} = req.body;
    
    try{
        if(!name || !email || !phone || !passwordHash || !conformPassword)
            return res.status(422).json({error: "Please fill the *required fields."})
        
        if(passwordHash !== conformPassword)
            return res.status(422).json({error: "Password not Matched."})

        if(passwordHash.length < 6){
            // console.log(passwordHash.length)
            return res.status(422).json({error: "Password must has atleast 6 letters."})
        }
        
        const isUserEmailExist = await User.findOne({email: email});
        if(isUserEmailExist)
            return res.status(422).json({error: "Email already Exit."});
            
        const user = new User({name, email, phone, work, passwordHash});
        // console.log(user);
        const result = await user.save();
        // console.log(result);
        if(result)
            res.status(201).json({message: "user Craeted"})
        else
            res.status(422).json({error: "Some Error occured"})
            
    }
    catch(err){
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.post('/login', async (req, res) => {
    const {email, passwordHash} = req.body;
    try{
        if(!email || !passwordHash)
            return res.status(400).json({error: "Please fill required feilds"});
        
        const isUserEmailExist = await User.findOne({email: email})

        if(!isUserEmailExist){
            return res.status(400).json({error: "Invalid Credentials"});
        }
            
        const isPasswordMatch = await bcrypt.compare(passwordHash, isUserEmailExist.passwordHash);
            
        if(isPasswordMatch){
            const token =  await isUserEmailExist.generateAuthToken();
            // console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
                }).status(200).json({message: "login successful"});
        }
        else{
            return res.status(400).json({error: "Invalid Credentials"});
        }
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
})

router.get('/about', authenticate, (req, res)=>{
    if(req.isLogin){
        res.status(200).send(req.user);
    }else{
        res.status(401).send('Please Login...');
    }
})

router.get('/contact', authenticate, (req, res)=>{
    if(req.isLogin){
        res.status(200).json(req.user);
    }else{
        res.status(401).json({error: 'Unauthorized User'});
    }
})

router.post('/contact', authenticate, async (req, res)=>{
    let {message} = req.body;
    try {
        if(!message)
            return res.status(422).json({error: `You can't send Empty Message.` });

        let userWhereWeWantInsertMessage = req.user;
        let isSavedMessage = await userWhereWeWantInsertMessage.saveUserMessage(message);
        if(isSavedMessage){
            res.status(200).json({message: 'Message sent Successfully.'});
        }
        else{
            return res.status(422).json({error: `Server Error.` });
        }

        
    } catch (err) {
        res.status(500).json({err});
    }

    // res.status(200).send(req.user);
})

router.get('/logout', (req, res) => {
    // console.log(req.cookies);
    res.clearCookie('jwtoken', {path: '/'})
    res.status(200).json({message: "ok"});
})

export default router;