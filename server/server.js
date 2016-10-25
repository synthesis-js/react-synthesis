const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const dbConfig = require('./db.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const blogController = require('./controllers/blog-controller');
const postController = require('./controllers/post-controller');
const userController = require('./controllers/user-controller');
const sessionController = require('./controllers/session-controller');
const cookieController = require('./controllers/cookie-controller');
const collectionController = require('./controllers/collection-controller');
const collectionItemController = require('./controllers/collection-item-controller');
const pluginController = require('./controllers/plugin-controller');
const pluginItemController = require('./controllers/plugin-item-controller');

//connecting to the database
mongoose.connect(dbConfig.url, function(err) {
  if (err) return console.error(err);
  console.log('connected to mongoDB @ mlab');
});

// handling cookies for all requests
app.use(cookieParser());
//using bodyParser for json
app.use(bodyParser.json());
// serving static from client folder
app.use((req, res, next) => {
  console.log(Date.now(),req.url);
  console.log(res.get('Content-Type'));
  // Cors
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(express.static('client'));
app.use(express.static('dist'));

app.get('/dashboard.html', sessionController.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname + './../client/components/dashboard.html'));
});

// ** authentication - authorized routes **
// login
app.post('/login', userController.verifyUser);

// ** blog ** 
// blog creation route
app.post('/api/blog', blogController.createBlog);

// listing all the blogs
app.get('/api/blogs', blogController.getAllBlogs);

// listing a specific blog
app.get('/api/blog/:blog_id', blogController.getBlogById);

// updating a specific blog
app.put('/api/blog/:blog_id', blogController.updateBlogById);

// deleting a specific blog
app.delete('/api/blog/:blog_id', blogController.deleteBlogById);

// ** post ** 
// post creation route
app.post('/api/post', postController.createPost);

// listing all the posts
app.get('/api/posts', (req, res, next) => {
  console.log('redirect', req.url);
  next();
}, postController.getAllPosts);

// listing a specific post
app.get('/api/post/:post_id', postController.getPostById);

// updating a specific post
app.put('/api/post/:post_id', postController.updatePostById);

// deleting a specific post
app.delete('/api/post/:post_id', postController.deletePostById);


// ** user **
// user creation route
app.post('/api/user', userController.createUser);

// listing all the users
app.get('/api/users', userController.getAllUsers);

// listing all the users
app.get('/api/user/:user_id', userController.getUserById);

// updating a specific user
app.put('/api/user/:user_id', userController.updateUserById);

// deleting a specific user
app.delete('/api/user/:user_id', userController.deleteUserById);

// ** collection **
// collection creation route
app.post('/api/collection', collectionController.createCollection);
// listing all the collections
app.get('/api/collections', collectionController.getAllCollections);
// deleting a specific collection
app.delete('/api/collection/:collection_id', collectionController.deleteCollectionById);

// ** collection items **
// collection item creation route
app.post('/api/collection_item', collectionItemController.createCollectionItem);
// getting all the collection items
app.get('/api/collection_items', collectionItemController.getAllCollectionItems);
// deleting a specific item
app.delete('/api/collection_item/:item_id', collectionItemController.deleteCollectionItemById);
// delete all items in collection
app.delete('/api/collection_items/:collection_id', collectionItemController.deleteCollectionItemsById);

// ** plugins **
// plugin item creation route
app.post('/api/plugin', pluginController.createPlugin);
// getting all the plugin s
app.get('/api/plugins', pluginController.getAllPlugins);
// deleting a specific plugin 
app.delete('/api/plugin/:plugin_id', pluginController.deletePluginById);
// delete all s in plugin
app.delete('/api/plugin/:plugin_id', pluginController.deletePluginById);

// ** plugin items **
// plugin item creation route
app.post('/api/plugin_item', pluginItemController.createPluginItem);
// getting all the plugin items
app.get('/api/plugin_items', pluginItemController.getAllPluginItems);
// deleting a specific item
app.delete('/api/plugin_item/:plugin_item_id', pluginItemController.deletePluginItemById);
// delete all items in plugin
app.delete('/api/plugin_item/:plugin_item_id', pluginItemController.deletePluginItemById);

// const pluginsRoutes = require('./plugins');

// ** PLUGINS ** DO NOT EDIT BELOW vvv

//%%begin%%
const test800Routes = require('./plugins/test800/server');
require('./plugins/test800/server/routes')(app);
require('../plugins/comments/server/routes')(app);
//%%end%%

// ** PLUGINS ** DO NOT EDIT ABOVE ^^^


// get list of plugins from plugin directory
app.get('/api/stored-plugins', (req, res) => {
  let plugins = fs.readdirSync('plugins').filter(file =>{
    return fs.statSync(path.join('plugins', file)).isDirectory();
  });
  res.send(plugins)
})

// function getDirectories(srcpath) {
//   return fs.readdirSync(srcpath).filter(function(file) {
//     return fs.statSync(path.join(srcpath, file)).isDirectory();
//   });
// }

// configuring env production port
const PORT = process.env.PORT || 3000

// spinning up the server 
app.listen(PORT, function () {
  console.log('react synthesis listening on port %s!', PORT);
});