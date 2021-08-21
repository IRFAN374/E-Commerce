const mongoose = require("mongoose");

const connectDB = async ()=>{
    // try {
        await mongoose.connect(process.env.DB_URL,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
        console.log("Successfully Connected to DB");
    // } catch (error) {
    //     console.log("Connection in DB::",error)
    // }
}

module.exports = connectDB