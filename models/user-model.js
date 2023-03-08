const mongoose = require('mongoose')
const Schema = mongoose.Schema

//MongoSchema for Shares
const shareSchema = new Schema({
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
        min:0
    }
})

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
    shares:[shareSchema],
    walletUSD:{
        type:Number,
        default:0,
        required:true,
        min:0
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User