const express = require('express');
const router = express.Router();
//const {Movies,Genres} = require('../models/movies');
const Movies = require('../models/movies').Movies;
const {Genres} = require('../models/movies');
const {joiMoviesSchema,joiMoviesSchemaPUT} = require('../models/joi_movies');

router.get('/' ,async (req,res) => {
    if(req.query.id){
        const movie = await Movies.findById(req.query.id);
        
        res.send(movie);
    }else{
        const movies = await Movies.find();
        console.log(movies);
        res.send(movies);
    }
    res.end();
});

router.post('/', async (req,res) => {

    const {error} = joiMoviesSchema.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    
    const movie = await new Movies({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
        ,genre: new Genres({name: req.body.genre.name})
    });
    try {
    movie.save();
    }catch(e){
        console.log("ERROR",e);
    }
    
    res.send(movie);

});

router.put('/:id', async (req,res) => {
    
    const {error} = joiMoviesSchemaPUT.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const movie = await Movies.findById(req.params.id);
    if(!movie)
        return res.status(400).send("Bad Request");
    movie.set({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: new Genres(req.body.genre)
    });

    movie.save();
    res.send(movie);

});

router.delete('/:id', async (req,res) => {
    const movie = await Movies.findById(req.params.id);
    if(!movie)
        return res.status(400).send("Bad Request");
    movie.remove();
    res.send(movie);
});




module.exports = router;

