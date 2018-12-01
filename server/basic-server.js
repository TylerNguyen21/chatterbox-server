var http = require('http');
var handler = require('./request-handler');
var url = require('url');
var utilities = require('./utilities.js');
var fs = require('fs');

var port = 3000;

var ip = '127.0.0.1';
var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10,
    'Content-Type': 'application/json'
  };

var routes = {
    '/classes/messages': handler.requestHandler
}

var server = http.createServer(function(request, response) {
    
    var statusCode = 200;
  
    var headers = defaultCorsHeaders;
    
    headers['Content-Type'] = 'application/json';
   
    response.writeHead(statusCode, headers);
    var urlParts = url.parse(request.url);
    var route = routes[urlParts.pathname];

    if (route) {
        route(request, response);
    } else {
        utilities.sendResponse(response, 'Not Found', 404);
    }
    response.end('Hello, World!');
  });

server.listen(port, ip);


