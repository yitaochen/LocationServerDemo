// requestHandlers.js
var querystring = require("querystring");
var locateAlgorithms = require("./locateAlgorithms");
fs = require("fs");
server = require("./server")

function start(response, postData, hostAddress, port) {
  console.log("Request handler 'start' was called.");

  //respond
  response.writeHead(200, {
    "Content-Type": "text/html"
  });
  var body = "You've connected to server: " + hostAddress + ":" + port + ". Please login to continue.";
  response.write(body);
  response.end();
}

function login(response, postData, hostAddress, port) {
  console.log("Request handler 'login' was called.");

  //respond
  var body = "You've logined to server. 'Finger' for fingerpringting your current location; 'Locate' for calculating your current location.";
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
  response.write(body);
  response.end();
}

function finger(response, postData, hostAddress, port) {
  console.log("Request handler 'finger' was called.");

  //respond
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
  var body = "You've sent the finger: " + postData;
  response.write(body);

  //update finger.txt
  file = fs.readFileSync("./db/finger.txt", "utf8");
  var payload = file.toString();
  var fingers = payload.split("\n");
  var storeData = postData + "\n";
  fs.appendFile("./db/finger.txt", storeData, function(err) {
    if(err) throw err;
    console.log(storeData + 'was appended to finger.txt!');
  });
  response.end();
}


function locate(response, postData, hostAddress, port) {
  console.log("Request handler 'locate' was called.");

  fs.readFile("./db/finger.txt", "utf8", function(error, file) {
    if(error) {
      response.writeHead(500, {
        "Content-Type": "text/plain"
      });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-Type": "text/plain"
      });
      locateAlgorithms.ed(file, response, postData);
      response.end();
    }
  });
}

function dbshow(response, postData, hostAddress, port) {
  console.log("Request handler 'dbshow' was called.");
  fs.readFile("./db/finger.txt", function(error, file) {
    if(error) {
      response.writeHead(500, {
        "Content-Type": "text/plain"
      });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-Type": "text/plain"
      });
      response.write("This is the Fingerprint DataBase: \n");
      response.write(file);
      response.end();
    }
  });
}

exports.start = start;
exports.login = login;
exports.finger = finger;
exports.locate = locate;
exports.dbshow = dbshow;