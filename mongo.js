// mongo.js
// by vampirefan
// start the mongodb.
// -------------------------------------------------
var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;

function start() {
    var server = new Server('localhost', 27017, {
        auto_reconnect: true
    });
    var db = new Db('exampleDb', server);

    db.open(function(err, db) {
        if(!err) {
            console.log("We are connected");
        }
    });
}

exports.start = start;