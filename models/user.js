
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },

    fname: {
        type: String,
        required: true
    },
    lname:{
        type: String,
        required:true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true        
        },
    userDate:{
        type: Date,
        required: true,
        default: Date.now
    }    
})

module.exports = mongoose.model('User', userSchema)