const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://tyagiop:11101999@cluster0.ohmuj.mongodb.net/inotebook?retryWrites=true&w=majority"


const connectToMongo = async ()=>{


    mongoose.connect(mongoURI,()=>{
        console.log("connected to Mongo successfullly");
    })

}
module.exports = connectToMongo;