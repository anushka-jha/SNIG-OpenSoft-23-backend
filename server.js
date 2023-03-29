const express = require('express');
const dotenv = require('dotenv');
const morgan= require('morgan');
const bodyParser= require("body-parser");
const path= require('path');
//install this uuid npm package
//const { v4: uuidv4 } = require('uuid');

const connectDB = require('./server/database/connection');
const session = require("express-session");
const { urlencoded } = require('body-parser');

const app = express();

dotenv.config({path : 'config.env'})
const PORT = process.env.PORT || 8080;
/*app.listen(PORT, () => {
    console.log('Server initiated succesfully');
  });*/

//log requests
app.use(morgan('tiny'));

//mongoDB coonection
connectDB();

//parse request to body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//set view engine
app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname, "views/ejs"))

//load assests
app.use('/css', express.static(path.resolve(__dirname, "assests/css")))
app.use('/img', express.static(path.resolve(__dirname, "assests/img")))
app.use('/js', express.static(path.resolve(__dirname, "assests/js")))

app.use(session({
    secret: 'secret', // instead of string, can use completely encrypted string via uuidv4()
    resave: false,
    saveUninitialized: true

}));

//load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=>{console.log(`Server running on http://localhost:${PORT}`)});
