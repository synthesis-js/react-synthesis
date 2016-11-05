const Blog = require('../models/blog');

let blogController = {};


// create the blog on mongoDB
blogController.createBlog = (req, res) => {

  let bodyObj = req.body;
  let newBlog = new Blog();

  newBlog.title = bodyObj.title;
  newBlog.description = bodyObj.description;
  newBlog.user_id = bodyObj.user_id;  
  newBlog.blog_id = bodyObj.blog_id;

  newBlog.save(function(err){
    if (err) {
      console.log(err);      
      throw err;
    }
  });

  res.sendStatus(200);
};

// list all blogs
blogController.getAllBlogs = (req, res) => {
  Blog.find({}, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.json(result); 
  });
};

// listing a specific blog by id
blogController.getBlogById = (req, res) => {
  Blog.findById(req.params.blog_id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result) {
      return res.json(result); 
    } else {
      return res.status(500).send("blog not found");
    }
  });
};

//updating blog by id
blogController.updateBlogById = (req, res) => {
  Blog.findByIdAndUpdate(req.params.blog_id, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};

//deleting blog by id
blogController.deleteBlogById = (req, res) => {
  Blog.findByIdAndRemove(req.params.blog_id, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send('blog deleted');
  });
};

module.exports = blogController;
