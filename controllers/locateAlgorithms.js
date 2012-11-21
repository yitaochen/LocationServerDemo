// locateAlgorithms.js
// by vampirefan
// Algorithms for positioning. include Euclidean Distance Algorithm(ed),
// -----------------------------------------------------
var Fingerprint = require("../models/fingerprint");

// Euclidean Distance Algorithm

function ed(body, postData, callback) {
  console.log("The Euclidean Distance Algorithm was called.");

  Fingerprint.getAll(function(err, fingerprints) {
    if(err) {
      return callback(err);
    }
    var minDistance = 65535;
    var minDistanceIndex = 0;
    var locateFrame = JSON.parse(postData);
    var fingersdistantce = new Array();
    for(var i = 0; i < fingerprints.length; ++i) {
      var tempdistance = 0;
      for(var j = 0; j < fingerprints[i].wapInfo.length; ++j) {
        tempdistance += (fingerprints[i].wapInfo[j].rssid - locateFrame.wapInfo[j].rssid) * (fingerprints[i].wapInfo[j].rssid - locateFrame.wapInfo[j].rssid);
      }
      fingersdistantce.push(tempdistance);
      if(fingersdistantce[i] < minDistance) {
        minDistance = fingersdistantce[i];
        minDistanceIndex = i;
      }
    }

    if(isNaN(fingersdistantce[0])) {
      console.log('Calculation Failed. Invalid postData.');
      body += 'Calculation Failed. Invalid postData.\n';
    } else {
      var locationId = fingerprints[minDistanceIndex].locationId;
      console.log('Calculation done. Returned locationId: ' + locationId);
      body += 'Calculation done. You get your current location: ' + 'locationId=' + locationId.toString() + ';\n';
    }
    return callback(err, body);
  });
}

exports.ed = ed;