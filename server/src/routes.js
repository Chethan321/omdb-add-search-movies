const express = require("express");
const { findByIdAndUpdate } = require("./models/Movie");
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

    router.put('/updateMovie', async(req,res) => {
        const {title,year,poster,imdbID,type,_id} = req.body;
        console.log({imdbID});
        Movie.findByIdAndUpdate (_id,{ 
            title,
            year,
            poster,
            imdbID,
            type
        }).then(response=>{
            res.json({message:"Movie updated successfully"});
        })
        
    });


    router.delete('/delete', async(req,res) => {
       
        Movie.deleteMany({ 
            imdbID: req.body.imbdID
        }).then(response=>{
            res.send({message:"Movie deleted successfully"});
        })
        .catch(err =>{
            res.status(400).send("Something went");
        })

        
    });

    return router;
}