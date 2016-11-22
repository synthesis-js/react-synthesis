# CLI toolbelt command center

As a developer you can use the cli toolbelt to create the main app, super user to access the dashboard and also have the basic plugin set up through it.

## App and superuser setup

- 1. Run the synth command passing in the name of you app and wait for the other questions via prompt:

````
synth <nameApp>
````

Important: if you get an error like: "-bash: /usr/local/bin/synth: No such file or directory" you will need to run ``` sudo npm install -g ``` (workaround in progress)

Important (2): you will need the server running to be able to post the data to your database, so don't forget to ```npm start```.

- 2. Going through the prompt you'll be asked to:

```
 -> enter the app title
 -> enter the app description
 -> enter email account (login)
 -> enter password
 -> enter author's name
 ```

- 3. After the confirmation you're safe to ctrl+c.

## Plugin infrastructure setup

- 1. The plugin setup will create all the files and folder structure, react and server, needed in order to begin extending react synthesis js.

Some of the files are going to be fully ready to go and other will need more attention from the team.

Here is the basic strutcture that will be created inside the plugins folder:

```
-/plugins
  -/<pluginName>
    -/components
      - PluginName.js
    -/server/
      - controller.js
      - index.js
      - model.js
      - routes.js
    - actions.js
    - actionTypes.js
    - constants.js
    - index.js
    - reducer.js
    - synth.js
```

- 2. To create a new plugin use:

```
synth-plugin <appName>
````

- 3. Enter the mount-point for the plugin
```
    -> post-feed - plugins that run on the list of posts of the app.
    -> post-view - plugins that are showed on the post view.
    -> dashboard - plugins that run only on the dashboard and are not visualised on frontend.
```

- 4. Wait for the confirmation message and you're safe to ctrl+c.
