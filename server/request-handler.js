const url = require('url');
const messages = [
  // {
  //   username: 'james',
  //   text: 'llkdjflksdf',
  //   message_id: 0
  // },
  // {
  //   username: 'william',
  //   text: 'hi james',
  //   message_id: 1
  // },
  // {
  //   username: 'james',
  //   text: 'hi william',
  //   message_id: 2
  // }
];
/***************************************************s**********

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  var dataToSend = null;

  const path = url.parse(request.url).path;
  const { method } = request;

  if (path === '/classes/messages') {
    response.writeHead(statusCode, headers);
    switch (method) {

    case 'GET':
      headers['Content-Type'] = 'application/json';
      dataToSend = JSON.stringify(messages);
      Send(statusCode, headers, dataToSend, response);
      break;
    case 'POST':
      headers['Content-Type'] = 'application/json';
      statusCode = 201;
      let body = [];
      request.on('data', function(chunk) {
        console.log('chunk: ' + JSON.parse(chunk));
        body.push(chunk);
      }).on('end', function () {
        body = JSON.parse(Buffer.concat(body));
        body.message_id = messages.length;
        messages.unshift(body);
        dataToSend = JSON.stringify(messages);
        Send(statusCode, headers, dataToSend, response);
      });
      break;
    case 'OPTIONS':
      headers['Content-Type'] = 'text/plain';
      Send(statusCode, headers, dataToSend, response);
      break;
    default:
      statusCode = 405;
      Send(statusCode, headers, dataToSend, response);
    }
  } else {
    statusCode = 404;
    Send(statusCode, headers, dataToSend, response);
  }
  // response.writeHead(statusCode, headers);
  // response.end(dataToSend);
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

var Send = function (statusCode, headers, dataToSend, response) {
  response.writeHead(statusCode, headers);
  response.end(dataToSend);
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};



module.exports.requestHandler = requestHandler;
