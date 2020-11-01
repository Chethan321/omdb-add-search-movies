const express = require("express");
const Movie = require("./models/Movie");

const router = express.Router();

module.exports = function(){
    router.get('/getMovies/:searchValue', async (req, res) => {
        const { searchValue } = req.params;
        const moviesData = await Movie.find({title:searchValue});
        console.log(moviesData);
        return res.send(moviesData);
    });

    router.get('/getMovieById/:searchValue', async (req, res) => {
        const { searchValue } = req.params;
        const moviesData1 = await Movie.find({imdbID:searchValue});
        console.log(moviesData1);
        return res.send(moviesData1);
    });
    
    router.post('/addMovie', async(req,res) => {
        const {title,year,poster,imdbID,type} = req.body;
        console.log({imdbID});
        const movie = new Movie({ 
            title,
            year,
            poster,
            imdbID,
            type
        });
        await movie.save();
        res.json({message:"Movie added successfully"});
    });

    return router;
}