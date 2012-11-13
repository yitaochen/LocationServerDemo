//app.js
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/login"] = requestHandlers.login;
handle["/finger"] = requestHandlers.finger;
handle["/locate"] = requestHandlers.locate;
handle["/dbshow"] = requestHandlers.dbshow;


//set Host Address
var hostAddress = "127.0.0.1";
var os = require('os');
var interfaces = os.networkInterfaces();
var addresses = [];
for(k in interfaces) {
    for(k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if(address.family == 'IPv4' && !address.internal) {
            addresses.push(address.address)
        }
    }
}
hostAddress = addresses[0];
//set Port
var port = 7878;

server.start(router.route, handle, hostAddress, port);