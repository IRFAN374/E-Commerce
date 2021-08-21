const jwt = require("jsonwebtoken")
const User = require('../models/User');
const ErrorResponse = require("../utils/errorResponse");


exports.protect = async (req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
       // " Bearer abcdffgg"
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token){
        return next( new ErrorResponse("Not authorized to access this routes",401))
    }
    // console.log("token is", token)
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("decoded",decoded);
        const user = await User.findById(decoded.id);
        if(!user){
            return next( new ErrorResponse("No user with this id", 404))
        }
        req.user = user
        next()
    } catch (error) {
        return next( new ErrorResponse("No authorization to access this router", 404))
    }
}