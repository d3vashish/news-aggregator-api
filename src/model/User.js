const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'full name is not provided'],
    },
    email: {
        type: String,
        unique: [true, 'email already exists'],
        lowercase: true,
        trim: true,
        required: [true, 'email is not provided'],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('User', userSchema);