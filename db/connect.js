const mongoose = require("mongoose");
 
const connectDB = (uri) =>{
    return mongoose.connect(uri,{
        //must set IP at network access to connect via cloud
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
};

module.exports = connectDB;