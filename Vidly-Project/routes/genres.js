const genres = [ { id: 1 , name: "Horror"}, {id: 2 , name: "Comedy"}, {id: 1 , name: "Romantic"}];
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const Genres = require('../models/movies').Genres;


router.get('/', async(req,res) => {
    
    if(req.query.id){
        const genres = await Genres
        .findById(req.query.id);
        console.log(genres);
        res.send(genres);
        res.end();
    }else{
        const genres = await Genres.find();
        res.send(genres);
        res.end();
    }

});
router.post('/', async(req,res) => {
    //Validate input
    const joiSchema = Joi.object({
        name: Joi.string().min(3).required()
    });
    //Assign error
    const {error} = joiSchema.validate(req.body);
    //const ress = Joi.validate(req.body, joiSchema);
    //Check if any error
    if(error){
        console.log(valResult);
        return res.status(400).send("Could not add to genres : " + error.details[0].message);
    }
    //Add data
    const genre = new Genres({
        name : req.body.name
    });
    await genre.save();
    //console.log(genres);
    res.send(genre);
    //res.send(valResult)
    res.end();
});
router.put('/id/:id', async(req,res) => {
    const id = req.params.id.toString();
    //Find if genre exists
    console.log("Inside PUT");
    const index = await Genres.findById(id);
    console.log(index);
    if(!index){
        return res.status(404).send("Could not find genre");
    }
    //Validate put body
    const joiSchema = Joi.object({
        name : Joi.string().min(3).required()
    });

    const {err} = joiSchema.validate(req.body);
    if(err){
        return res.status(400).send("Bad Request => " + err.details[0].message);
    }

    index.name = req.body.name;
    await index.save();
    res.send(index);
    res.end();
     
});



router.delete('/:id', async(req,res) => {
    //Check if there is a course
    const id = req.params.id.toString();
    const item = await Genres.findById(id);
    if(!item){
        return res.status(404).send("Could not find genre");
    }
    //If there is than delete
    
    item.remove();
    res.send(item);
});



module.exports = router;