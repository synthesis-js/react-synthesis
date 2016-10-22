// index.js
// gather components in plugin folder for export
const Collection = require('./collection/containers/Data');
const PostManager = require('./post-manager/containers/Posts');
const PostFeed = require('./post/containers/PostFeed');
const Comments = require('./Comments/components/Comments');

// import plugin config
const CollectionData = require('./collection/plugin.synth');
const PostManagerData = require('./post-manager/plugin.synth');
const PostFeedData = require('./post/plugin.synth');
const CommentsData = require('./Comments/plugin.synth');

module.exports = { Collection, CollectionData, PostManager, PostManagerData, PostFeed, PostFeedData, Comments, CommentsData }
