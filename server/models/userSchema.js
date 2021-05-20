import mongoose from 'mongoose';

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

const User = mongoose.model('user',userSchema);

export default User;