var Userdb = require('../model/model');
// const Userdb = require("./models/userdbs");
// const Bankdb = require("./models/bankdbs");


// Verify user on login page
exports.post('/login', (req,res) => {
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }
    else if(req.body.username == user.username && req.body.password == user.password){
        if(req.body.confirmPassword == user.confirmPassword){
            req.session.user ==req.body.email;
            res.redirect('/dashboard');
        }
        else{
            res.end("You entered the wrong password!")
        }
    }
    else{
        res.end("Invalid Login Details!")
    }

});

//create and save new User
exports.create = (req, res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    //this is test commit
    //new user
    // user is instance of Userdb module 
    const user= new Userdb({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        city: req.body.city,
        phNum: req.body.phNum,
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
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

//create and save user's new bank details
exports.create = (req, res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    // account is instance of Bankdb module 
    const user= new Bankdb({
        accNum: req.body.accNum,
        bankName: req.body.bankName,
        ifscCode: req.body.ifscCode,
        accHolderName: req.body.accHolderName,
        phNum: req.body.phNum,
        aadharCardNum: req.body.aadharCardNum
    })

    //save bank data in bank database
user
    .save(account)
    .then(data =>{
        res.send(data)
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occured while creating a create operation"
        });
    });
}

//update a new identified user by user id
exports.update=(req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "Data cannot be empty"})

    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false}) //if ay error occurs, delete {useFindAndModify: false}
     .then(data => {
        if(!data){
            res.status(404).send({message: `Cannot update user with ${id}. Maybe user not found!`})
        }else{
            res.send(data)
        }
     })
     .catch(err =>{
        res.status(500).send({message: "Error updating user information"})
     })

}

//Delete a user with specified user id in the request
exports.delete=(req, res)=>{

}