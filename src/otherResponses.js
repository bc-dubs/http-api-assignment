/* const respondJSON = (request, response, status, message, id) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });

    const jsonObj = id? {message: message, id: id} : {message: message};
    response.write(JSON.stringify(jsonObj));

    response.end();
};

const respondXML = (request, response, status, message, id) => {
    response.writeHead(status, { 'Content-Type': 'text/xml' });

    response.write(xmlStr);
    response.end();
}; */

const respond = (request, response, acceptedTypes, status, message, id) => {
  if (acceptedTypes === 'text/xml' || acceptedTypes[0] === 'text/xml') {
    response.writeHead(status, { 'Content-Type': 'text/xml' });
    const xmlStr = id ? `<response><message>${message}</message><id>${id}</id></response>` : `<response><message>${message}</message></response>`;
    response.write(xmlStr);
  } else {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    const jsonObj = id ? { message, id } : { message };
    response.write(JSON.stringify(jsonObj));
  }
  console.dir(acceptedTypes);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  respond(request, response, acceptedTypes, 200, 'Success');
};

const badRequest = (request, response, acceptedTypes) => {
  respond(request, response, acceptedTypes, 400, 'Bad request', 'badRequest');
};

module.exports = {
  success,
  badRequest,
};
