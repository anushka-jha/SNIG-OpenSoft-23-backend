var Userdb = require('../model/model');
// const Userdb = require("./models/userdbs");
// const Bankdb = require("./models/bankdbs");

//create and save new User
exports.create = (req, res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    //new user
    // user is instance of Userdb module 
    const user= new Userdb({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    //save user data in database
user
    .save(user)
    .then(data =>{
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occured while creating a create operation"
        });
    });
}

//retrieve and return all users/ a single user
exports.find = (req, res)=>{
    Userdb
}

//update a new identified user by user id
exports.update=(req, res)=>{

}

//Delete a user with specified user id in the request
exports.delete=(req, res)=>{

}