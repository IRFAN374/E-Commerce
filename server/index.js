const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const route = require("./routes/auth");
const connectDB = require('./config/dbConnect');
const errorHandler = require('./middleware/errorHandler')


// connect Db
connectDB()

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use('/api/auth',route);
app.use('/api/private',require('./routes/private'));

// Error handler should be last middleware
app.use(errorHandler)

const PORT = process.config.PORT || 5000;
const server = app.listen(PORT, ()=>{
    console.log(`Server is listening :http://localhost:${PORT}`);
})


process.on("unhandledRejection", (err, promise)=>{
    console.log(`Logged Error: ${err}`);
    server.close(()=> process.exit(1));
})