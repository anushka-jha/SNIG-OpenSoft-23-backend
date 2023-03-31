const asyncHandler = require('express-async-handler');
var User = require('../model/model');
// const Userdb = require("./models/userdbs");
// const Bankdb = require("./models/bankdbs");
// const paymentdb = require("./models/paymentdbs");

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
const logOutUser = asyncHandler(async (req, res) => {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('index', {title: "login", logout: "logout successfull!"})
        }
    })
})
//taken from following vid, refer if any error
//https://www.youtube.com/watch?v=NNzwjWXUiLU&list=PLynWqC6VC9KMwdsbBIG68YEBMlUrTwed-&index=37

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

// store payment information entered by user 
const paymentUser = asyncHandler(async (req, res) => {

    // Creating a new instance of a model `paymentdb` with the extracted data
    const newPayment = new paymentdb({
      accNum, ifscCode, recipientName, description
    })

     // Saving the new payment in the database using `save()` method of the model
    newPayment
    .save(newPayment)
    .then(register=>{
      res.json(register)
    })
      .catch(error=>{
      res.status(400).json({err: error.message || "Something went wrong"})
    })

    res.json({accNum, ifscCode, recipientName, description});
  })


module.export = {
    authUser,
    logOutUser,
    registerUser,
    registerBankUser,
    updateUserProfile,
    deleteUser,
    paymentUser
}