# Backend of the Banking System

The backend API is built using Node.js and Express.js and Mongoose. It handles requests from the frontend UI and interacts with the database to retrieve or update data. The backend API provides a set of RESTful endpoints that define the functionality of the application.
This project will hold the server application. First run npm install from the root. After this you will run npm run-script install-all from the root. From now on run this command anytime you want to install all modules again. This is a script we have defined in package.json .

## Manual Installation

Clone the repo:

```bash
git clone https://rb.gy/xyk7
cd backend-node-express
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env
# open .env and modify the environment variables
```


## Commands

Running in development:

```bash
npm start
# or
npm run dev
```

Running in production:

```bash
# build
npm run build
# start
npm run prod
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.

```bash
# App name
APP_NAME = # default App Name

PORT = 5000

# URL of the Mongo DB
MONGO_URI = mongodb+srv://admin:admin1230@cluster0.xoulxsf.mongodb.net/?retryWrites=true&w=majority

# URL frontend
FRONTEND_URL = # default http://localhost:777

# URL of PayPal Id
PAYPAL_CLIENT_ID = AQXyLYIU6pUinQhSe8-dBKPkpTSktRuF4VzBUjAFgknHPLcTiHjtWzsvmM7tDB4lzy5kaVN2TiHWIzA1
```

## Project Structure

```
server\
 |--controller\    # Controllers
 |--database\      # Connects to MongoDB database
 |--model\         # Mongoose models
 |--routes\        # Routes
 |--services\      # Business logic
 |--views\         # Represents a unique page on the website i.e. Home or About. These are still normal react components.
 
config\             # Environment variables and configuration
server.js           # This is what renders all of our browser routes and different views
```

## Featured Technologies

* [Node.js](https://nodejs.org/): An open-source JavaScript run-time environment for executing server-side JavaScript code.
* [Express.js](https://expressjs.com/): Express.js: It is a popular Node.js framework that provides a set of tools and libraries for building web applications. Express.js is used to create RESTful APIs for the MERN project.
* [MongoDB](https://www.mongodb.com/): It is a NoSQL document database that stores data in JSON-like documents. MongoDB is used to store the data for the MERN project.
* [Mongoose](https://mongoosejs.com/): It is an Object Data Modeling (ODM) library for MongoDB and Node.js. Mongoose is used to create models, schemas, and handle data validation for the MongoDB database. The databases defined for this are User database, Bank database and Payment database.
