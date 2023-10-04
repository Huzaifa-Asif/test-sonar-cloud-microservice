var express = require('express');
var router = express.Router();

var film = require('../controllers/controller.film.js');
const mediaUpload = require("../../config/media_upload");

//Add film
router.post('/add', mediaUpload.fields([
    {
      name: 'photo', maxCount: 1
    }
  ]),function (req, res) {
    var filmForm = req.body;

    console.log(filmForm)

    if(req.files.photo){
        filmForm.photo = req.files.photo[0].location;
    }

    film.addFilm(filmForm  ,function (err, filmResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "film Added successfully",
                status: true, 
                data: filmResult
            });
        }

    });

});


//Get All films List
router.get('/get_all', function (req, res) {
    film.getAllFilms(function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "film Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No film Exist",
                status: false,
                data: result
            });
        }
        
    });

});



//Get film By Id
router.get('/get_by_id/:filmId', function (req, res) {
    film.getFilmById(req.params.filmId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "film Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No film Exist with this filmId",
                status: false
            });
        }
        
    });

});


//Update Pin film
router.patch('/update/:filmId', mediaUpload.fields([
    {
      name: 'photo', maxCount: 1
    }
  ]),function (req, res) {
    var filmForm = req.body;
    var filmId = req.params.filmId;
    console.log(filmForm)

    if(req.files.photo){
        filmForm.photo = req.files.photo[0].location;
    }

    film.updateFilm(filmId, filmForm, {new: true}, function (err, filmResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "film Updated successfully",
                status: true, 
                data: filmResult
            });
        }

    });

});


// Remove film By Id
router.get('/remove_by_id/:filmId', function (req, res) {
    film.removeFilm(req.params.filmId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result){
            return res.json({
                message: "film Removed",
                status: true,
            });
        }
        else{
            return res.json({ 
                message: "film not removed",
                status: false
            });
        }
        
    });

});


module.exports = router;