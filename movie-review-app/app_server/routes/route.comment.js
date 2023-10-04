var express = require('express');
var router = express.Router();

var comment = require('../controllers/controller.comment.js');


//Add comment
router.post('/add',function (req, res) {
    var commentForm = req.body;

    comment.addComment(commentForm  ,function (err, commentResult) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else{
            return res.json({
                message: "comment Added successfully",
                status: true, 
                data: commentResult
            });
        }

    });

});


//Get All Comments By filmId
router.get('/get_all_by_filmid/:filmId', function (req, res) {
    comment.getAllCommentByFilmId(req.params.filmId, function (err, result) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error in Connecting to DB",
                status: false
            });
        }
        else if(result.length>0){
            return res.json({
                message: "Comments Exist",
                status: true,
                data: result
            });
        }
        else{
            return res.json({ 
                message: "No Comment Exist with this filmId",
                status: false
            });
        }
        
    });

});


module.exports = router;