var film =require('../models/model.film.js');

// Get Film By Id
module.exports.getFilmById = (id ,callback) =>  {
	film.find({_id:id}, callback);
}

// Get All Films
module.exports.getAllFilms = (callback) =>  {
	film.find(callback).sort([['createdAt', -1]])
}

// Add Film
module.exports.addFilm = async (filmForm, callback) => {
	film.create(filmForm, callback);
}


// Update Film
module.exports.updateFilm = async (filmId, filmForm, options, callback) => {
	var query = {_id: filmId};
	film.findOneAndUpdate(query,filmForm,options, callback);
}



// Delete Film   
module.exports.removeFilm = (id, callback) => {
    var query = {_id: id};
    film.remove(query, callback)
}
