#!/usr/bin/env node
const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');
const fs = require('fs');
const progressBar = require('progress');
const request = require('superagent');

console.log('welcome, hi there, we\'re team synthesis!');
console.log('run: syn <blogName> or syn -h');
program
  .arguments('<blog>')
  .action(function (blog) {
    co(function *() {
      let blogTitle = yield prompt('blog title: ');
      let blogDescription = yield prompt('blog description: ');
      let email = yield prompt('email account: ');
      let password = yield prompt.password('password: ');
      let name = yield prompt('name: ');
      //console.log('user: %s and blog %s created!',
      //  email, blog);
      // process.exit();
      //creating the blog
      let newBlog = {};
      newBlog.title = blogTitle;
      newBlog.description = blogDescription;
      newBlog.user_id = '1001';  
      newBlog.blog_id = '101';
      // console.log('after newBlog obj', newBlog);


      // creating the user
      let newUser = {};
      newUser.email = email;
      newUser.password = password;
      newUser.name = name;
      newUser.blog_id = '101';   

      console.log("...");
      console.log("... creating blog");
      request
       .post('http://localhost:3000/api/blog')
       .set('Accept', 'application/json')
       .send(newBlog)       
       .end(function (err, res) {
         if (err) {
          //  console.log(err.status);
           console.log('closing connection...');
           process.exit();
         } else {
          console.log("... OK... DONE");
         }
       });

      // posting user to the api
      console.log("...");
      console.log("... creating user");
      request
       .post('http://localhost:3000/api/user')
       .send(newUser)
       .set('Accept', 'application/json')
       .end(function (err, res) {
         console.log('---- before error ----');
         if (err) {
          //  console.log(err.status);
           console.log('closing connection...');
           process.exit();
         } else {
          console.log("... OK... DONE");
         }
         console.log('---- after error ----');         
       });
      process.exit();    
    })
  })
  .parse(process.argv)
