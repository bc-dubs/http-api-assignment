// Generalized response function that can send either JSON or XML
const respond = (request, response, acceptedTypes, status, message, id) => {
  if (acceptedTypes === 'text/xml' || acceptedTypes[0] === 'text/xml') {
    response.writeHead(status, { 'Content-Type': 'text/xml' });
    // Sends response without ID tag if id wasn't passed to the function
    const xmlStr = id ? `<response><message>${message}</message><id>${id}</id></response>` : `<response><message>${message}</message></response>`;
    response.write(xmlStr);
  } else { // If the accepted type is JSON (or anything else)...
    response.writeHead(status, { 'Content-Type': 'application/json' });
    const jsonObj = id ? { message, id } : { message };
    response.write(JSON.stringify(jsonObj));
  }
  response.end();
};

const success = (request, response, acceptedTypes) => {
  respond(request, response, acceptedTypes, 200, 'The request was successful!');
};

const badRequest = (request, response, acceptedTypes, params) => {
  if (!params.valid) {
    respond(request, response, acceptedTypes, 400, "Missing required parameter 'valid'", 'badRequest');
  } else if (params.valid !== 'true') {
    respond(request, response, acceptedTypes, 400, "Parameter 'valid' not set to 'true'", 'badRequest');
  } else {
    respond(request, response, acceptedTypes, 200, 'The request was successful!');
  }
};

const unauthorized = (request, response, acceptedTypes, params) => {
  if (!params.loggedIn) {
    respond(request, response, acceptedTypes, 401, "Missing required parameter 'loggedIn'", 'unauthorized');
  } else if (params.loggedIn !== 'yes') {
    respond(request, response, acceptedTypes, 401, "Parameter 'loggedIn' not set to 'yes'", 'unauthorized');
  } else {
    respond(request, response, acceptedTypes, 200, 'The request was successful!');
  }
};

const forbidden = (request, response, acceptedTypes) => {
  respond(request, response, acceptedTypes, 403, 'Access to this content is forbidden', 'forbidden');
};

const internal = (request, response, acceptedTypes) => {
  respond(request, response, acceptedTypes, 500, 'Something went wrong on our end!', 'internalError');
};

const notImplemented = (request, response, acceptedTypes) => {
  respond(request, response, acceptedTypes, 501, 'This page is under construction!', 'notImplemented');
};

const notFound = (request, response, acceptedTypes) => {
  respond(request, response, acceptedTypes, 404, 'The requested resource could not be found', 'notFound');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
