const Comment = require('./comment');

let commentController = {};

// creating the post on mongo
commentController.createComment = (req, res) => {
  let bodyObj = req.body;
  let newComment = new Comment();

  newComment.body = bodyObj.body;
  newComment.author = bodyObj.author;
  newComment.author_email = bodyObj.author_email;  
  newComment.post_id = bodyObj.post_id;

  newComment.save(function(err){
    if (err) {
      console.log(err);
      throw err;
    }
  });

  res.sendStatus(200);
};

//listing all the comments
commentController.getAllComments = (req, res) => {
    Comment.find({}, (err, result) => {
      if (err) return res.status(500).send(err);
      return res.json(result); 
    });
  };

//listing comment by id
commentController.commentById = (req, res) => {
  Comment.findById(req.params.comment_id, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.json(result); 
  });
};

//updating comment by id - moderation
commentController.updateCommentById = (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};

//deleting comment by id
commentController.deleteCommentById = (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('comment deleted!');
  });
};

module.exports = commentController;
