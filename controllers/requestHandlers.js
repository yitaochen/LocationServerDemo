// requestHandlers.js
// by vampirefan
// functions for different request. include /, /start, /login, /finger, /locate, /dbshow
// -----------------------------------------------------

var server = require("../models/server");
var querystring = require("querystring");
var fs = require("fs");
var Fingerprint = require("../models/fingerprint");
var locateAlgorithms = require("./locateAlgorithms");

function start(response, postData, hostAddress, port) {
  console.log("Request handler 'start' was called.");
  //respond
  response.writeHead(200, {
    "Content-Type": "text/html"
  });
  var body = "You've connected to server: " + hostAddress + ":" + port + ". Please login to continue.\n";
  response.write(body);
  response.end();
}

function login(response, postData, hostAddress, port) {
  console.log("Request handler 'login' was called.");
  //respond
  var body = "You've logined to server. 'Finger' for fingerpringting your current location; 'Locate' for calculating your current location.\n";
  response.writeHead(200, {
    "Content-Type": "text/plain"
  });
  response.write(body);
  response.end();
}

function finger(response, postData, hostAddress, port) {
  console.log("Request handler 'finger' was called.");
  if(postData === '') {
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.write('finger failed. postData is null.');
    response.end();
  } else {
    var body = "You've sent the finger: " + postData + ".\n";
    var fingerprint = JSON.parse(postData);
    var newFingerprint = new Fingerprint({
      locationId: fingerprint.locationId,
      bearing: fingerprint.bearing,
      wapInfo: fingerprint.wapInfo
    });
    Fingerprint.getOne(fingerprint.locationId, function(error, fingerprint) {
      if(error) {
        body += 'finger failed. invaled postData.' + error.name + ': ' + error.message;
      }
      if(fingerprint === null) {
        newFingerprint.save(function(error) {
          if(error) {
            body += 'finger failed. invaled postData.' + error.name + ': ' + error.message;
          }
        });
        body += 'finger complete.';
      } else {
        body += 'finger failed. locationId exists.';
      }
      //respond
      response.writeHead(200, {
        "Content-Type": "text/plain"
      });
      response.write(body);
      response.end();
    });
  }
}

function locate(response, postData, hostAddress, port) {
  console.log("Request handler 'locate' was called.");
  if(postData === '') {
    response.writeHead(200, {
      "Content-Type": "text/plain"
    });
    response.write('locate failed. postData is null.');
    response.end();
  } else {
    var body = "You've sent the locateFrame: " + postData + ".\n";
    locateAlgorithms.ed(body, postData, function(error, body) {
      if(error) {
        body += 'finger failed. invaled postData.' + error.name + ': ' + error.message;
      }
      //respond
      response.writeHead(200, {
        "Content-Type": "text/plain"
      });
      response.write(body);
      response.end();
    });
  }
}

function dbshow(response, postData, hostAddress, port) {
  var body = '';
  Fingerprint.getAll(function(error, fingerprints) {
    if(error) {
      body += 'finger failed. invaled postData.' + error.name + ': ' + error.message;
    }
    body += '<html>' + '<head>' + '<meta http-equiv="Content-Type" content="text/html; ' + 'charset=UTF-8" />' + '</head>' + '<body>' + '<table border="1">' + '<tr><th>locationId</th><th>bearing</th><th>[00602F3A07BC].rssid</th><th>[00602F3A07BD].rssid</th><th>[00602F3A07BE].rssid</th><th>[00602F3A07BF].rssid</th><th>[00602F3A07BG].rssid</th></tr>';
    for(var i = 0; i < fingerprints.length; ++i) {
      body += '<tr><td>' + fingerprints[i].locationId + '</td><td>' + fingerprints[i].bearing + '</td>';
      for(var j = 0; j < fingerprints[i].wapInfo.length; ++j) {
        body += '<td>' + fingerprints[i].wapInfo[j].rssid + '</td>';
      }
      body += '</tr>';
    }
    body += '</table>' + '</body>' + '</html>';
    // body = JSON.stringify(fingerprints);
    //respond
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
  });
}

exports.start = start;
exports.login = login;
exports.finger = finger;
exports.locate = locate;
exports.dbshow = dbshow;