const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Schema for User Model
const userSchema = new Schema({
    username:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    googleId:{
        type:String,
        trim:true,
        required:true
    },
    shares:[{
        companyName:{
            type:String,
            trim:true,
            lowercase:true,
            required:true
        },
        companySymbol:{
            type:String,
            trim:true,
            uppercase:true,
            required:true
        },
        sharesBought:{
            type:Number,
            required:true,
            default:0,
            min:0
        }
    }],
    walletUSD:{
        type:Number,
        default:0,
        required:true,
        min:0
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User