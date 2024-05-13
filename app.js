const express = require('express');
const routes = require('express').Router();
const NewsAggregator = require('./src/routes/NewsAggregator')
const { signin, signup } = require('./src/controllers/AuthController')
const mongoose = require("mongoose");

    try {
        mongoose.connect("mongodb://0.0.0.0:27017/usersdb");
        console.log("connected to db");
    } catch (error) {
        console.log(error);
    }


const app = express();
const port = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)

routes.use('/', NewsAggregator)
routes.post('/register', signup);

routes.post('/signin', signin);
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;