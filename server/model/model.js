//This is a Node.js module that defines a Mongoose schema for a User
//and exports it as a model for use in other parts of the application.

const mongoose= require('mongoose');

var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    country:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    phNum:{
        type: Number,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    confirmPassword: {
        type: String,
        required: true,
        unique: true
    }
})

var bankSchema = new mongoose.Schema({
    accNum:{
        type: Number,
        required: true,
        unique: true
    },
    bankName:{
        type: String,
        required: true
    },
    ifscCode:{
        type: String,
        required: true,
        unique: true 
    },
    accHolderName:{
        type: String,
        required: true
    },
    phNum:{
        type: Number,
        required: true,
        unique: true
    },
    aadharCardNum:{
        type: Number,
        required: true,
        unique: true
    }
})

const Userdb = mongoose.model('userdb', userSchema);
const Bankdb = mongoose.model('bankdb', bankSchema);
module.exports = Userdb;
module.exports = Bankdb;
