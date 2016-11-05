FROM node:6.5.0

# Create app directory
RUN mkdir -p /usr/src/react-synthesis
WORKDIR /usr/src/react-synthesis

# Install app dependencies
COPY package.json /usr/src/react-synthesis/
RUN npm install

# Bundle app source
COPY . /usr/src/react-synthesis

# Copy index.html for the dev environment
RUN cp -f index.html.prod /usr/src/react-synthesis/index.html

# Create build
RUN npm run build 

EXPOSE 3000
CMD [ "npm", "start" ]
