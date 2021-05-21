import express from 'express';
import User from '../models/userSchema.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello world');
})

router.post('/register', async (req, res)=>{
    const {name, email, phone, work, passwordHash} = req.body;
    
    try{
        if(!name || !email || !phone || !passwordHash)
            return res.status(422).json({error: "please fill the required fields"})
        
        const isUserEmailExist = await User.findOne({email: email})

        if(isUserEmailExist)
            return res.status(422).json({error: "Email already Exit"})

        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json({message: "user Craeted"})
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
});

router.post('/login', async (req, res) => {
    const {email, passwordHash} = req.body;
    try{
        if(!email || !passwordHash)
            return res.status(400).json({error: "please fill required feilds"});
        
        const isUserEmailExist = await User.findOne({email: email})
        // console.log(isUserEmailExist)

        if(isUserEmailExist)
            return res.status(200).json({message: "login successfull"});
        else{
            return res.status(400).json({error: "Invalid Credentials"});
        }
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
})

export default router;