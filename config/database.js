const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("DB connected"))
    .catch((err)=>{
        console.log("Error occured while connectiong to DB");
        console.log(`Error: ${err}`);
    })
}