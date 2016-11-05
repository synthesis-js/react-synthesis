const Post = require('../models/post');

let postController = {};

// creating the post on mongo
postController.createPost = (req, res) => {
  let bodyObj = req.body;
  let newPost = new Post();

  newPost.title = bodyObj.title;
  newPost.body = bodyObj.body;
  newPost.user_id = bodyObj.user_id;
  newPost.status = bodyObj.status;
  newPost.post_type = bodyObj.post_type;
  newPost.uri = bodyObj.uri;

  newPost.save(function(err){
    if (err) {
      console.log(err);      
      throw err;
    }
  });

  res.sendStatus(200);
};

//listing all the posts
postController.getAllPosts = (req, res) => {
  Post.find({}, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.json(result); 
  });
};

//listing post by id
postController.getPostById = (req, res) => {
  Post.findById(req.params.post_id, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.json(result); 
  });
};

//updating post by id
postController.updatePostById = (req, res) => {
  Post.findByIdAndUpdate(req.params.post_id, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};

//deleting post by id
postController.deletePostById = (req, res) => {
  Post.findByIdAndRemove(req.params.post_id, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('post deleted!');
  });
};

module.exports = postController;
