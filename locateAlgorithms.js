// locateAlgorithms.js
// by vampirefan
// Algorithms for positioning. include Euclidean Distance Algorithm(ed),
// -----------------------------------------------------

// Euclidean Distance Algorithm
function ed(file, response, postData) {
    console.log("The Euclidean Distance Algorithm was called.");
    // console.log("\n This is finger DataBase");
    // console.log(file);

    var minDistance = 65535;
    var minDistanceIndex = 0;

    // TXT METHOD
    // var payload = file.toString();
    // var fingers = payload.split("\n");
    // var fingersdistantce = new Array();
    // for(var i = 0; i < fingers.length - 1; ++i) {
    //     var fingerdata = fingers[i].split(",");
    //     var currentdata = postData.split(",");
    //     var tempdistance = 0;
    //     for(var j = 1; j < fingerdata.length; ++j) {
    //         tempdistance += (parseInt(fingerdata[j], 10) - parseInt(currentdata[j - 1], 10)) * (parseInt(fingerdata[j], 10) - parseInt(currentdata[j - 1], 10));
    //     }
    // JSON METHOD
    var locateFrame = JSON.parse(postData);
    var fingerdb = JSON.parse(file);

    var fingersdistantce = new Array();
    // console.log(fingerdb.length);
    for(var i = 0; i < fingerdb.length; ++i) {
        var tempdistance = 0;
        for(var j = 0; j < fingerdb[i].wapInfo.length; ++j) {
            tempdistance += (parseInt(fingerdb[i].wapInfo[j].rssid, 10) - parseInt(locateFrame.wapInfo[j].rssid, 10)) * (parseInt(fingerdb[i].wapInfo[j].rssid, 10) - parseInt(locateFrame.wapInfo[j].rssid, 10));
        }
        fingersdistantce.push(tempdistance);
        if(fingersdistantce[i] < minDistance) {
            minDistance = fingersdistantce[i];
            minDistanceIndex = i;
        }
    }

    if(isNaN(fingersdistantce[0])) {
        console.log("Calculation Failed. Invalid postData.");
        response.write("Calculation Failed. Invalid postData.\n");
    } else {
        console.log("Calculation done. Returned locationId:");

        //TXT METHOD OUTPUT
        // var locationId = fingers[minDistanceIndex].split(",")[0];
        // console.log(locationId);
        // response.write("Calculation Done. You get your current location: " + "locationId=" + locationId.toString() + ";\n");
        // JSON METHOD OUTPUT
        var locationId = fingerdb[minDistanceIndex].locationId;
        console.log(locationId);
        response.write("Calculation Done. You get your current location: " + "locationId=" + locationId.toString() + ";\n");
    }
}

exports.ed = ed;