import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: false
    },
    work: {
        type: String,
        default: null
    },
    passwordHash: {
        type: String,
        required: true
    },
    messages: [
        {
            date:{
                type: Date,
                default: Date.now
            },
            message:{
                type: String,
            }
        }
    ],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// this will get the object
userSchema.pre('save', async function(next){
    if(this.isModified('passwordHash')){
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    }
    // console.log(this.name)
    // console.log(this.email)
    // console.log(this.phone)
    // console.log(this.passwordHash)
    next();
})

//generate token
//acually we are populating userSchema object
userSchema.methods.generateAuthToken = async function(){
    try {
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        // console.log(this.tokens)
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

//saving user message
userSchema.methods.saveUserMessage = async function(message){
    try {
        // console.log(this);
        // console.log(message);
        this.messages = this.messages.concat({message: message});
        // console.log(this)
        let result = await this.save();
        // console.log(result)
        if(result){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

// const obj = {
//     myclass: class{
//         constructor(a, b){
//             this.p1 = a;
//             this.p2 = b;
//         }
//         func(calback) {
//             calback(this.p1,this.p2);
//         }
//     }
// }
// let obj1 = new obj.myclass("my name", "gurwinder");
// obj1.func(function(x, y){
//     console.log(x, y)
// })

const User = mongoose.model('user',userSchema);

export default User;