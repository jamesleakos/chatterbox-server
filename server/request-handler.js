const url = require('url');
const messages = [
  {
    username: 'james',
    text: 'llkdjflksdf'
  },
  {
    username: 'william',
    text: 'hi james'
  },
  {
    username: 'james',
    text: 'hi william'
  }
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
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.

  var statusCode = 200;
  // Tell the client we are sending them plain text.
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';

  const path = url.parse(request.url).path;
  const { method } = request;

  // Get data
  console.log('data: ' + request.data);

  if (path === '/classes/messages') {
    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    response.writeHead(statusCode, headers);

    if (method === 'GET') {
      // Calling .end "flushes" the response's internal buffer, forcing
      // node to actually send all the data over to the client.
      response.end(JSON.stringify(messages));

    } else if (method === 'POST') {

    }
  } else {
    statusCode = 404;
    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    response.writeHead(statusCode, headers);
    response.end();
  }




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
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};

module.exports = requestHandler;
