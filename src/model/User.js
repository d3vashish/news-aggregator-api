var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "name not provided "],
    },
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
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
    role: {
        type: String,
        required: true
    },
    preferences: {
        type: [],
        default: [],
    }
}, {
    /** creates createdAt and updatedAt fields */
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);