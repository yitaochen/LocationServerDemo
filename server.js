//server.js
var http = require("http");
var url = require("url");

function start(route, handle, hostAddress, port) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData, hostAddress, port);
    });
  }

  //create Server
  http.createServer(onRequest).listen(port);
  console.log("Server has started at http://" + hostAddress + ":" + port);
  // console.log("Server has started at http://127.0.0.1:7878");
}

exports.start = start;