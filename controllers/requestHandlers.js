// requestHandlers.js
// by vampirefan
// functions for different request. include /, /start, /login, /finger, /locate, /dbshow
// -----------------------------------------------------
var server = require('../models/server');
var querystring = require('querystring');
var fs = require('fs');
var Fingerprint = require('../models/fingerprint');
var locateAlgorithms = require('./locateAlgorithms');
var logger = require('./logger');

function start(response, postData, hostAddress, port) {
  console.log("Request handler 'start' was called.");
  //respond
  response.writeHead(200, {
    "Content-Type": "text/html"
  });
  // var body = "You've connected to server: " + hostAddress + ":" + port + ". Please login to continue.\n";
  var body = "You've connected to server: http://LocationServerDemo.cloudfoundry.com. Please login to continue.\n";
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
    console.log('finger failed. postData is null.');
    response.write('finger failed. postData is null.');
    response.end();
  } else {
    var body = "You've sent the finger: " + postData + ".\n";
    var fingerprintInput = JSON.parse(postData);
    var newFingerprint = new Fingerprint({
      locationId: fingerprintInput.locationId,
      bearing: fingerprintInput.bearing,
      wapInfo: fingerprintInput.wapInfo
    });
    Fingerprint.getOne(fingerprintInput.locationId, function(error, fingerprint) {
      if(error) {
        body += 'finger failed. invaled postData.' + error.name + ': ' + error.message;
      }
      if(fingerprint === null) {
        newFingerprint.insert(function(error) {
          if(error) {
            body += 'finger failed. invaled postData.' + error.name + ': ' + error.message;
          }
        });
        body += 'finger complete.';
        logger.info('mongodb has a new fingerprint:\n' + 'locationId=' + fingerprintInput.locationId);
      } else {
        console.log('finger failed. locationId exists.');
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
        body += 'locate failed. invaled postData.' + error.name + ': ' + error.message;
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
    body += '<html>' + '<head>' + '<meta http-equiv="Content-Type" content="text/html; ' + 'charset=UTF-8" />' + '</head>' + '<body>';
    body += '<table border="1">' + '<tr><th>locationId</th><th>bearing</th><th>[00:60:2f:3a:07:35].rssid</th><th>[00:60:2f:3a:07:65].rssid</th><th>[00:60:2f:3a:07:15].rssid</th><th>[00:60:2f:3a:07:f5].rssid</th><th>[00:60:2f:3a:07:b5].rssid</th></tr>';
    for(var i = 0; i < fingerprints.length; ++i) {
      body += '<tr><td>' + fingerprints[i].locationId + '</td><td>' + fingerprints[i].bearing + '</td>';
      for(var j = 0; j < fingerprints[i].wapInfo.length; ++j) {
        body += '<td>' + fingerprints[i].wapInfo[j].rssid + '</td>';
      }
      body += '</tr>';
    }
    body += '<form action="/LocationServerTest.fingerprints.remove()" method="post"><input type="submit" value="!!!Remove All fingerprints!!!" /></form>';
    body += '</table>';
    body += '</body>' + '</html>';
    // body = JSON.stringify(fingerprints);
    //respond
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
  });
}

function dbremove(response, postData, hostAddress, port) {
  var body = '';
  Fingerprint.removeAll(function(error) {
    if(error) {
      body += 'fingerprints remove failed: ' + error.name + ': ' + error.message;
    }
    body += 'All fingerprints Removed';
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
exports.dbremove = dbremove;