const mongoose = require('mongoose');

const mongoURI = "[YOUR DATABASE URL]"


const connectToMongo = async ()=>{


    mongoose.connect(mongoURI,()=>{
        console.log("connected to Mongo successfullly");
    })

}
module.exports = connectToMongo;
