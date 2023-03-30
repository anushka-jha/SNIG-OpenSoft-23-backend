const asyncHandler = require('express-async-handler');
var User = require('../model/model');
// const Userdb = require("./models/userdbs");
// const Bankdb = require("./models/bankdbs");

// Verify user on login page
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }
    else if (user && (await user.matchPassword(password))) {
      res.json({
        username: user.username,
        confirmPassword : user.confirmPassword,
        email: user.email,
      } ) 
      res.redirect('/dashboard');
    } 
    else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  })

// Logout user
// const logOutUser = asyncHandler(async (req, res) => {
//     req.session.destroy(function(err){
//         if(err){
//             console.log(err);
//             res.send("Error")
//         }else{
//             res.render('base', {title: "Express", logout: "logout successfull!"})
//         }
//     })
// })

//create and save new User
const registerUser = asyncHandler(async (req, res) => {
    const {name, email,password,country,city,phNum,username,confirmPassword} = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
      name,
      email,
      password,
      country,
      city,
      phNum,
      username,
      password,
      confirmPassword
    })
  
    if (user) {
      res.status(201).json({
        name: user.name,
        email: user.email,
        country : user.country,
        city : user.city,
        phNum : user.phNum,
        username : user.username,
        password : user.password ,
      confirmPassword : user.confirmPassword
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })

  const registerBankUser = asyncHandler(async (req, res) => {
    const { accNum, bankName,ifscCode,accHolderName,phNum,aadharCardNum } = req.body
  
    const userExists = await User.findOne({accHolderName})
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
        accNum, 
        bankName,
        ifscCode,
        accHolderName,
        phNum,
        aadharCardNum
    })
  
    if (user) {
      res.status(201).json({
        accNum: user.accNum,
        bankName: user.bankName,
        ifscCode: user.ifscCode,
        accHolderName: user.accHolderName,
        phNum: user.phNum,
        aadharCardNum:user.aadharCardNum
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
 
//update a new identified user by user id
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
  
      const updatedUser = await user.save()
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  
//Delete a user with specified user id in the request
//exports.delete=(req, res)=>{

//}
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

module.export = {
    authUser,
    registerUser,
    registerBankUser,
    updateUserProfile,
    deleteUser
}