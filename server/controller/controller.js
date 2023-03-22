var Userdb = require('../model/model');

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
        gender: req.body.gender,
        status: req.body.status
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