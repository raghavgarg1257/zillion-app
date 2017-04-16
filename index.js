"use strict";

// importing our dependencies
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import logger from "morgan";
import mongoose from 'mongoose';
import cors from "cors";

// importing our files
import router from "./app/routes";


// injecting environment variables
dotenv.config();


// initializing server requirments
const port = process.env.PORT || 3000;
const app = express();


// to log every request to the console
app.use(logger('dev'));


// set static files (css and images, etc) location
app.use(express.static('public'));


// setting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// enabling cors on all routes
app.use(cors());


// setting up routes for our app
// we made router a function so that any instance can be passed from here
// should be defined just before starting the server
app.use('/', router(express));


// making DB connection
mongoose.connect(`mongodb://localhost/${process.env.DB}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // start the server if only db connection is succesfull
    app.listen(port, () => console.log(`App started at: ${port}`) );
});
