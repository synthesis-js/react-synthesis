const commentController = require('./controller');

module.exports = function(app) {

  // ** comment routes **
  // comment creation route

  app.post('/api/comment', commentController.createComment);

  // listing all the comments
  app.get('/api/comments', commentController.getAllComments);

  // listing comment by id
  app.get('/api/comment/:comment_id', commentController.commentById);

  // updating a specific comment
  app.put('/api/comment/:comment_id', commentController.updateCommentById);

  // deleting a specific comment
  app.delete('/api/comment/:comment_id', commentController.deleteCommentById);
};