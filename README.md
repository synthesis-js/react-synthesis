# Synthesis

![Alt text](/admin/assets/logo.jpg)

Synthesis is a extensible open-source content management framework built for the modern web with React, Redux, Express, and Mongo. It is designed to be pragmatic and extensible, so it's easy to create a website or web app, new features and plugins around Synthesis.

Our goal with Synthesis is provide a simple starting point for you next web project. We're striving to make the framework approachable for both developers and non-developers.  Also to provide a marketplace of plugins to aid in speeding up the development of your web project. 

Our team is currently working on completing the alpha version which should wrap this November. 

## Installation
```
git clone https://github.com/synthesis-js/react-synthesis.git

cd react-synthesis

npm install
```

Next create a file in the root directory titled config.js. This file will hold the url to your mongo database as well as your secret key for password hashing. 

We recommend using mongo labs for a simple remote database https://mlab.com/.

Your session secret should be a string.

```
// config.js
const sessionSecret = "hashSecret";
const serverConfig = "mongodb://database.url";

module.exports = { sessionSecret, serverConfig };
```

Next run the webpack build command to compile our react components.
```
npm run build
```

For local development, start up the react development server and navigate to http://localhost:7700/
```
npm run dev:hot
```

Then start up the express server
```
npm start
```

If no users have been created you will be redirected to the sign-up page to create the admin user.

## Dockerfile for deployment

We have created a Docker support for the production environment.

```
> docker build -t react-synthesis/backend .
> docker run -t -p 49170:3000 react-synthesis/backend
```

## Pull Requests

We'd love your help making Synthesis better! Feel free to create issues or pull requests to start discussions.

## Feature Requests / Plugin ideas

Have an idea for a package or a feature you'd love to see in Synthesis? Check out our site Idea board to contribute your thoughts and vote on existing ideas.

## License

Synhesis is <a href="https://github.com/synthesis-js/synthesis/blob/master/LICENSE" >MIT licensed</a>
