const mongoose = require('mongoose')

const NotesSchema = mongoose.Schema({


    identifire:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
        
    
    title :{
        type :String,
        required : true,
    },
    
    content:{
        type :String,
        default:""
        
    },
   
        
    
    date:{
        type :Date,
        default:Date.now,
        
    }



})

let notes = mongoose.model('notes',NotesSchema);

module.exports= notes 