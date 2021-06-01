import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

async function authenticate(req, res, next) {
    try {
        // console.log(req);
        const token = req.cookies.jwtoken;
        // console.log(token)
        if(token){
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
            // console.log(verifyToken)
            const user = await User.findOne({_id: verifyToken._id, "tokens.token": token});
            // console.log(user)
            if(!user){
                req.isLogin = false;
                next();
            }
            else{
                req.isLogin = true;
                req.token = token;
                req.user = user;
                req.userId = user._id;
                next();
            }

        }
        else{
            req.isLogin = false;
            next()
        }
        
    } catch (err) {
        console.log(err);
    }
}

export {authenticate};