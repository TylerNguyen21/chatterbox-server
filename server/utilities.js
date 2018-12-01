var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json'
};

exports.sendResponse = (response, data, statusCode) => {
    statusCode = statusCode || 200;
    response.writeHead(statusCode, defaultCorsHeaders);
    response.end(JSON.stringify(data));
  }