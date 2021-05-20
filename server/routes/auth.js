import express from 'express';
import User from '../models/userSchema.js';

const router = express.Router();

router.get('/', (req, res)=>{
    res.send('hello world');
})

router.post('/register', async (req, res)=>{
    const {name, email, phone, work, passwordHash} = req.body;
    
    try{
        if(!name || !email || !phone || !passwordHash)
            return res.status(422).json({error: "please fill the required fields"})
        
        const isUserEmailExit = await User.findOne({email: email})

        if(isUserEmailExit)
            return res.status(422).json({error: "Email already Exit"})

        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json({message: "user Craeted"})
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
})

export default router;