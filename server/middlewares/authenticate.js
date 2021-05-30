import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

async function authenticate(req, res, next) {
    try {
        // console.log(req);
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyToken)
        const user = await User.findOne({_id: verifyToken._id, "tokens.token": token});
        // console.log(user)
        if(!user)
            throw new Error('User not found')
        
        req.token = token;
        req.user = user;
        req.userId = user._id;
        next();
    } catch (err) {
        res.status(401).send('Unauthorized User')
        console.log(err);
    }
}

export {authenticate};