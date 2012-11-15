// requestHandlers.js
// by vampirefan
// functions for different request. include /, /start, /login, /finger, /locate, /dbshow
// -----------------------------------------------------

var querystring = require("querystring");
var locateAlgorithms = require("./locateAlgorithms");
fs = require("fs");
server = require("./server");

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

  var body = "";
  var storeData = "";
  if(postData === "") {
    body = "finger failed. postData is null.";
  } else {
    body = "You've sent the finger: " + postData;

    // update finger DataBase
    // TXT METHOD
    // var storeData = postData + "\n";
    // fs.appendFile("./db/finger.txt", storeData, function(err) {
    //   if(err) throw err;
    //   console.log(storeData + 'was appended to finger.txt!');
    // });

    // JSON METHOD
    file = fs.readFileSync("./db/finger.json", "utf8");
    var fingerdb = JSON.parse(file);
    var fingerFrame = JSON.parse(postData);
    fingerdb.push(fingerFrame);
    storeData = JSON.stringify(fingerdb);
    // console.log(file);
    // console.log(storeData);
    fs.writeFile("./db/finger.json", storeData, function(e) {
      if(e) throw e;
    });
  }
  //respond
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
  response.write(body);
  response.end();
}

function locate(response, postData, hostAddress, port) {
  console.log("Request handler 'locate' was called.");

  // fs.readFile("./db/finger.txt", "utf8", function(error, file) {
  fs.readFile("./db/finger.json", "utf8", function(error, file) {
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