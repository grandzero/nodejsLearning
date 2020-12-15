const mongoose = require('mongoose');


const genresSchema = mongoose.Schema({
    name: String
});
const Genres = mongoose.model('Genres', genresSchema);

const moviesSchema = mongoose.Schema({
    title: {
        type:String,
        maxLength: 100,
        minLength: 3,
        required: true
    },
    genre : {
        type: genresSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        max: 100,
        min: 0
    },
    dailyRentalRate: {
        type:Number,
        max: 100,
        min: 0
    }
});

const Movies = mongoose.model('Movie', moviesSchema);

exports.Genres = Genres;
exports.Movies = Movies;