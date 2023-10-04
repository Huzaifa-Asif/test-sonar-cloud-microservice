var comment = require('../models/model.comment.js');

// Add Comment
module.exports.addComment = async (commentForm, callback) => {
	comment.create(commentForm, callback);
}

// Get All Comment By filmId
module.exports.getAllCommentByFilmId = (filmId, callback) => {
	comment.find({ filmId: filmId }, callback)
		.populate({ path: 'userId', select: ['name', 'email'] });
}





