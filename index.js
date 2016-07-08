// Use install modules
const Hapi = require('hapi');
const Path = require('path');
const HapiSwagger = require('hapi-swagger');
const Joi = require('joi');
const Pack = require('./package');
const Inert = require('inert');
const Vision = require('vision');
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});

// Use variables
var options = {
  info: {
    title: 'Interdominio CMS Documentation',
    version: Pack.version,
  }
};

// Create a Hapi server
server.connection({
  host: 'localhost',
  port: 8000
});


// Options server register
server.register([
  Inert,
  Vision,
  {
    register: HapiSwagger,
    options: options
  }], (err) => {

    // Start the server
    server.start((err) => {
      if (err) {
        console.error();(err);
      } else {
        console.log('Server running at:', server.info.uri);
      }
    });
  }
);



server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: './production',
            redirectToSlash: true,
            index: true
        }
    }
});

server.route({
    method: 'GET',
    path: '/vendors/{param*}',
    handler: {
        directory: {
            path: './vendors',
            redirectToSlash: true,
            index: true
        }
    }
});

server.route({
    method: 'GET',
    path: '/build/{param*}',
    handler: {
        directory: {
            path: './build',
            redirectToSlash: true,
            index: true
        }
    }
});
