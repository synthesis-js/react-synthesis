#!/usr/bin/env node
const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');
const fs = require('fs');
const request = require('superagent');

console.log('welcome, let\'s create some plugins!');
console.log('run: syn-plugin <pluginName> or syn-plugin -h');
program
  .arguments('<pluginName>')
  .action(function (pluginName) {
    co(function *() {
      let mountPoint= yield prompt('mount point -> dashboard, post-feed or post-view: ');      
      let description = yield prompt('plugin description: ');
      console.log(mountPoint, description, pluginName);
      // creating plugin directory and config file
      createDirAndFiles(pluginName, mountPoint);
      editServerFile(pluginName);          
      createPlugin(pluginName, mountPoint);
    })
  })
  .parse(process.argv);
// console.log('it worked, feel safe to ctrl+C'); 

function createDirAndFiles(dirName, mountPoint) {
    let path = './plugins/'+dirName;
    let componentsDir = './plugins/'+dirName+'/components';
    let serverDir = './plugins/'+dirName+'/server';

    fs.mkdir(path, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('plugin dir created');

        //creating synth.js file
        fs.readFile('./tpl-plugin/synth.js', 'utf8', function(err, fileContents) {
          if (err) throw err;
          fileContents = fileContents.replace(/%name%/i, dirName);
          fileContents = fileContents.replace(/%mount_point%/i, mountPoint);
          fs.writeFile(path + "/synth.js", fileContents, function(err) {
              if (err) {
                  console.log('error writing file', err);
              } else {
                  console.log('synth.js writing file succeeded');
              }
          });
        });

        //creating actions.js file
        fs.readFile('./tpl-plugin/actions.js', 'utf8', function(err, fileContents) {
          if (err) throw err;
          fileContents = fileContents.replace(/%name%/gi, dirName);
          fs.writeFile(path + "/actions.js", fileContents, function(err) {
              if (err) {
                  console.log('error writing file', err);
              } else {
                  console.log('actions.js writing file succeeded');
              }
          });
        });

        //creating actionTypes.js file
        fs.readFile('./tpl-plugin/actionTypes.js', 'utf8', function(err, fileContents) {
          fileContents = fileContents.replace(/%name%/gi, dirName);          
          if (err) throw err;
          fs.writeFile(path + "/actionTypes.js", fileContents, function(err) {
              if (err) {
                  console.log('error writing file', err);
              } else {
                  console.log('actionTypes.js writing file succeeded');
              }
          });
        });

        //creating constants.js file
        fs.readFile('./tpl-plugin/constants.js', 'utf8', function(err, fileContents) {
          fileContents = fileContents.replace(/%name%/gi, dirName);          
          if (err) throw err;
          fs.writeFile(path + "/constants.js", fileContents, function(err) {
              if (err) {
                  console.log('error writing file', err);
              } else {
                  console.log('constants.js writing file succeeded');
              }
          });
        });

        //creating index.js file
        fs.readFile('./tpl-plugin/index.js', 'utf8', function(err, fileContents) {
          if (err) throw err;
          fileContents = fileContents.replace(/%name%/gi, dirName);          
          fs.writeFile(path + "/index.js", fileContents, function(err) {
              if (err) {
                  console.log('error writing file', err);
              } else {
                  console.log('index.js writing file succeeded');
              }
          });
        });

        //creating reducer.js file
        fs.readFile('./tpl-plugin/reducer.js', 'utf8', function(err, fileContents) {
          if (err) throw err;
          fileContents = fileContents.replace(/%name%/gi, dirName);
          fs.writeFile(path + "/reducer.js", fileContents, function(err) {
              if (err) {
                  console.log('error writing file', err);
              } else {
                  console.log('reducer.js writing file succeeded');
              }
          });
        });

      }
    });

    fs.mkdir(componentsDir, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('components dir created');
        fs.readFile('./tpl-plugin/components/Plugin.js', 'utf8', function(err, fileContents) {
          if (err) throw err;
          fileContents = fileContents.replace(/%name%/gi, dirName);
          fs.writeFile(componentsDir+'/'+firstLetterUpperCase(dirName)+'.js', fileContents, function(err) {
              if (err) {
                  console.log('error writing file', err);
              } else {
                  console.log('components plugin writing file succeeded');
              }
          });
        });
      }
    });

    fs.mkdir(serverDir, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('server dir created');
        
        //creating controller.js in server folder
        fs.readFile('./tpl-plugin/server/controller.js', 'utf8', function(err, fileContents) {
          if (err) throw err;
          fileContents = fileContents.replace(/%name%/gi, dirName);          
          fs.writeFile(serverDir + "/controller.js", fileContents, function(err) {
              if (err) {
                  console.log('error writing file', err);
              } else {
                  console.log('server/controller.js writing file succeeded');
              }
          });
        });

        //creating routes.js in server folder
        fs.readFile('./tpl-plugin/server/routes.js', 'utf8', function(err, fileContents) {
          if (err) throw err;
          fileContents = fileContents.replace(/%name%/gi, dirName);          
          fs.writeFile(serverDir + "/routes.js", fileContents, function(err) {
              if (err) {
                  console.log('server/routes.js error writing file', err);
              } else {
                  console.log('routes.js writing file succeeded');
              }
          });
        });

        //creating model.js in server folder
        fs.readFile('./tpl-plugin/server/model.js', 'utf8', function(err, fileContents) {
          if (err) throw err;
          fileContents = fileContents.replace(/%name%/gi, dirName);          
          fs.writeFile(serverDir + "/model.js", fileContents, function(err) {
              if (err) {
                  console.log('error writing file', err);
              } else {
                  console.log('server/model.js writing file succeeded');
              }
          });
        });  

        //creating index.js in server folder        
        fs.readFile('./tpl-plugin/server/index.js', 'utf8', function(err, fileContents) {
          if (err) throw err;
          fileContents = fileContents.replace(/%name%/gi, dirName);
          fs.writeFile(serverDir + "/index.js", fileContents, function(err) {
              if (err) {
                  console.log('error writing file', err);
              } else {
                  console.log('server/index.js writing file succeeded');
              }
          });
        });          

      }
    });
}

function editServerFile(pluginName) {
    let pathServerFile = './server/server.js';
    let requireStr = '//%%begin%%\nconst '+pluginName+'Routes = require(\'./plugins/'+pluginName+'/server\');\nrequire(\'./plugins/'+pluginName+'/server/routes\')(app);'
    fs.readFile(pathServerFile, 'utf8', function(err, fileContents) {
      if (err) throw err;
      console.log(typeof fileContents);
      fileContents = fileContents.replace(/\/\/%%begin%%/i, requireStr);
      fs.writeFile(pathServerFile, fileContents, function(err) {
          if (err) {
              console.log('error writing file', err);
          } else {
              console.log('writing file succeeded');
          }
      });
    });
  }

  function firstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function createPlugin(pluginName, mountPoint) {
      // creating the plugin on database
      let newPlugin = {};
      newPlugin.name = pluginName;
      newPlugin.mount_point = mountPoint;  
      newPlugin.plugin_properties = [];

      console.log("...");
      console.log("... creating plugin");
      request
       .post('http://localhost:3000/api/plugin')
       .set('Accept', 'application/json')
       .send(newPlugin)       
       .end(function (err, res) {
         if (err.status === 404) {
          //  console.log(err.status);
           console.log('closing connection...');
           process.exit();
         } else {
          console.log("... OK... DONE");
         }
       });
  }