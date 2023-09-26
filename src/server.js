// Standard setup code
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlResponseHandler = require('./htmlResponses.js');
const otherResponseHandler = require('./otherResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlDict = {
  '/success': otherResponseHandler.success,
  '/badRequest': otherResponseHandler.badRequest,
  '/unauthorized': otherResponseHandler.unauthorized,
  '/forbidden': otherResponseHandler.forbidden,
  '/internal': otherResponseHandler.internal,
  '/notImplemented': otherResponseHandler.notImplemented,
  '/style.css': htmlResponseHandler.getCSS,
  '/': htmlResponseHandler.getIndex,
  notFound: otherResponseHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept;
  const params = query.parse(parsedUrl.query);

  const handlerFunction = urlDict[parsedUrl.pathname];

  // Shorter way to write the if statement
  (handlerFunction || urlDict.notFound)(request, response, acceptedTypes, params);
};

// Starting up server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
