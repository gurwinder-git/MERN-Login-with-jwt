import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    name: {
        type: String,
        required: true
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
    }
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

const User = mongoose.model('user',userSchema);

export default User;