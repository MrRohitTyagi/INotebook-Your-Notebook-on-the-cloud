const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    UID:{
        type : Number,
        required : true,
        unique:true
        
        
    },
    name :{
        type :String,
        required : true,
    },
    email:{
        type :String,
        required : true,
        unique : true
    },
    password:{
        type :String,
        required : true
    },
    date:{
        type :Date,
        default:Date.now,
        
    }



})
module.exports= mongoose.model('userdatas',userSchema);