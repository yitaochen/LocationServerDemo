// locateAlgorithms.js
fs = require("fs");

// Euclidean Distance Algorithm

function ed(file, response, postData) {
    console.log("The Euclidean Distance Algorithm was called.");
    console.log("\n This is finger.txt");
    console.log(file);
    var minDistance = 65535;
    var minDistanceIndex = 0;
    var payload = file.toString();
    var fingers = payload.split("\n");
    var fingersdistantce = new Array();
    for(var i = 0; i < fingers.length - 1; ++i) {
        var fingerdata = fingers[i].split(",");
        var currentdata = postData.split(",");
        var tempdistance = 0;
        for(var j = 1; j < fingerdata.length; j++) {
            tempdistance += (parseInt(fingerdata[j], 10) - parseInt(currentdata[j - 1], 10)) * (parseInt(fingerdata[j], 10) - parseInt(currentdata[j - 1], 10));
        }
        fingersdistantce.push(tempdistance);

        if(fingersdistantce[i] < minDistance) {
            minDistance = fingersdistantce[i];
            minDistanceIndex = i;
        }
    }
    // console.log(minDistanceIndex);
    //console.log(fingersdistantce[minDistanceIndex]);
    console.log("We have your locationId:");
    console.log(fingers[minDistanceIndex].split(",")[0]);

    var locationId = fingers[minDistanceIndex].split(",")[0];
    var x = fingers[minDistanceIndex].split(",")[1];
    var y = fingers[minDistanceIndex].split(",")[2];
    response.write("Calculation Done. You get your current location: " + "locationId=" + locationId.toString() + ";\n");
}

exports.ed = ed;