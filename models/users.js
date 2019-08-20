const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid.')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        required: true,
        maxlength: 2,
        validate(value){
            if( value < 0 ){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        // TODO need to complete the hashing for plain text password.
        type: String,
        trim: true,
        require: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password can not contain password')
            }
        }
    },
    address: [
        {
            primaryAddress: {
                type: String,
                require: true,
                trim: true,
                lowercase: true,
                minlength: 3
            },
            primaryCity: {
                type: String,
                require: true,
                trim: true,
                minlength: 2
            },
            primaryState: {
                type: String,
                uppercase: true,
                maxlength: 2,
                minlength: 2,
                trim: true,
                require: true
            },
            primaryPostalCode: {
                type: Number,
                maxlength: 5,
                minlength: 5,
                trim: true,
                require: true
            }
        },
        {
            secondaryAddress: {
                type: String,
                trim: true,
                lowercase: true,
                minlength: 3
            },
            secondaryCity: {
                type: String,
                trim: true,
                minlength: 2
            },
            secondaryState: {
                type: String,
                uppercase: true,
                maxlength: 2,
                minlength: 2,
                trim: true
            },
            secondaryPostalCode: {
                type: Number,
                maxlength: 5,
                minlength: 5,
                trim: true
            }
        }
    ]
})

module.exports = User