const User = require("../models/User")
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

exports.register = async(req,res,next)=>{
   const {username, email, password} = req.body;
   try {
       const user = await User.create({ username, email, password });
      //  res.status(201).json({ user, success: true })
      sendToken(user, 201, res);

   } catch (error) {
    //    res.status(500).json({ success: false, error: error.message })
       next(error)
   }
}

exports.login = async (req,res,next)=>{
  const { email,password} = req.body;
  if(!email || !password){
    //   return res.status(400).json({ success: false, error: "Please provide email and password" })
      return next( new ErrorResponse('Please provide an Email and password',400));
  }
  try {
      const user = await User.findOne({email}).select("+password");
      if(!user){ 
        //   return res.status(404).json({ success: false, error: "Invalid Credentials" }) 
          return next( new ErrorResponse('Invalid Credentials',401));
        }
      const isMatch = await user.matchPasswords(password);
      if(!isMatch){
        //   return res.status(404).json({ success: false, error: 'inavlid credentials' })
          return next( new ErrorResponse('Invalid Credentials',401));
      }
      sendToken(user, 200, res);
      // return res.status(200).json({
      //     success: true,
      //     user,
      //     token: 'abcbcbbedjdjj'
      // })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

exports.forgotpassword = async (req,res,next)=>{
    const { email} = req.body;
    try {
      const user = await User.findOne({email});
      if(!user){
        return next (new ErrorResponse("Email Could not Sent", 404));
      }
      //console.log("user is",user);
      const resetToken = user.getResetPasswordToken()
     // const token = user.getSignedToken()
     // console.log("I am called")
      await user.save()

      const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

      const message = `
         <h1> You have requested a password reset. </h1>
         <p>Please go to this link to reset your password</p>
         <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;

      try {
        await sendEmail({
          to: user.email,
          subject: 'Password Reset Request',
          text: message
        });

        res.status(200).json({
          success: true,
          data: "Email Sent"
        });

      } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return next( new ErrorResponse("Email could not to be send", 500))
      }

    } catch (error) {
      next(error);
    }
}

exports.resetpassword = async (req,res,next)=>{
    const resetPasswordToken = crypto .createHash('sha256') .update(req.params.resetToken) .digest("hex")

    try {
      const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now()} })
      
      if(!user){
        return next( new ErrorResponse("Invalid Reset request",400))
      }
      user.password = req.body.password;
      user.resetPasswordExpire = undefined;
      user.resetPasswordToken = undefined;
      
      await user.save();
      res.status(201).json({ success: true, data: 'Password reset Success' })
      
    } catch (error) {
      next(error)
    }
}



const sendToken = (user, statusCode, res) =>{
  const token = user.getSignedToken()
  res.status(statusCode).json({
    success: true,
    token,
    user
  })
}