const Router= require('express');
const express= require('express');
const route= express.Router()

const services= require('../services/render');
const controller = require('../controller/controller');
/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', function(req, res)
    {services.homeRoutes});

/**
 *  @description add users
 *  @method GET / add-user
 */
route.get('/add-user', function(req, res){services.add_user})

//creating route
/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', function(req, res){services.update_user})

// route.post('/payments', function(req, res){services.payment})

//API
route.post('/api/users', function(req, res){controller.post});
route.post('/api/users', function(req, res){controller.create});
route.get('/api/users', function(req, res){controller.find});
route.put('/api/users/:id', function(req, res){controller.update});
route.delete('/api/users/:id', function(req, res){controller.delete});
//payment routing trial
// route.post('/api/payments', function(req, res){controller.create});


module.exports = route