/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var utilities = require('./utilities.js');
var fs = require('fs');
var body = [];
var url = require('url');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json'
};

var actions = {
  'GET': function(request, response) {
    if(request.url === '/classes/messages') {
    utilities.sendResponse(response, {results: body});
    } else {
    utilities.sendResponse(response, 'Not Found', 404);
    }
  },
  'POST': function(request, response) {

    request.on('data', function(data) {
      body.push(JSON.parse(data));
    });
    request.on('end', function() {
      //console.log("Body: " + body);
    });
    response.writeHead(201, {'Content-type': 'text/plain'});
    response.end('post received');
  },
  'OPTIONS': function(request, response) {
    response.writeHead(200, defaultCorsHeaders);
    response.end();
  }
}

module.exports.requestHandler = function(request, response) {
  var action = actions[request.method];
  if (action) { 
    action(request, response);
  } else {
    utilities.sendResponse(response, 'Not Found', 404);
  }
}
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


