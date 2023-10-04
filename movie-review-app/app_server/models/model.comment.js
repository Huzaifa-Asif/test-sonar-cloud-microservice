const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Comment Schema

const commentSchema = new schema({
    filmId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Film',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    text: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },


})


const comment = module.exports = mongoose.model('Comment', commentSchema);