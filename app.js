// app.js
// by vampirefan
// the main app.
// -----------------------------------------------------
var server = require('./models/server');
var router = require('./controllers/router');
var requestHandlers = require('./controllers/requestHandlers');

var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/login'] = requestHandlers.login;
handle['/finger'] = requestHandlers.finger;
handle['/locate'] = requestHandlers.locate;
handle['/dbshow'] = requestHandlers.dbshow;

// set Host Address
// Modify the hostAddress [url/ip] here.
var hostAddress = '127.0.0.1';

// get the local ipv4 address, just for test, please comment the following when use.
var os = require('os');
var interfaces = os.networkInterfaces();
var addresses = [];
for(var k in interfaces) {
    for(var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if(address.family == 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}
hostAddress = addresses[0];

// set Port
// Modify the port number here.
var port = 7878;

// start Server.
server.start(router.route, handle, hostAddress, port);
