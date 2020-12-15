const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals');
const Joi = require('joi');


mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to mongo succesfully'))
    .catch(() => console.log('Error while connecting to db'));



app.use(express.json());
app.use(express.urlencoded({extended:true}));

const apiDebugger = require('Debug')('app:api');



app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.get('/', (req,res)=> {
    res.send("Welcome Vidly API");
    res.end();
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Node has started");
})