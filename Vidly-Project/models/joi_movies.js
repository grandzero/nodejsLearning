const Joi = require('joi');


const joiMoviesSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    numberInStock: Joi.number().min(3).max(100).required(),
    dailyRentalRate: Joi.number().min(3).max(100).required(),
    genre: Joi.required()
});

const joiMoviesSchemaPUT = Joi.object({
    title: Joi.string().min(3).max(100),
    numberInStock: Joi.number().min(3).max(100),
    dailyRentalRate: Joi.number().min(3).max(100),
    genre: Joi.required()
});

exports.joiMoviesSchema = joiMoviesSchema;
exports.joiMoviesSchemaPUT = joiMoviesSchemaPUT;