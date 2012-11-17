// mongo.js
// by vampirefan
// start the mongodb.
// -------------------------------------------------
var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;

var server = new Server('localhost', 27017, {
    auto_reconnect: true
});
var db = new Db('exampleDb', server);

function start() {
    db.open(function(err, db) {
        if(!err) {
            console.log("We are connected");
        }
    });
}

function create() {
    try {
        file = fs.readFileSync("./db/finger.json", "utf8");
        var fingerdb = JSON.parse(file);
        db.collection('test', function(err, collection) {
            collection.save(fingerdb);
        });
    } catch(e) {
        console.log(e.name + ": " + e.message);
    }
}

function insert(fingerFrame) {
    try {
        db.collection('test', function(err, collection) {
            collection.insert(fingerFrame);
        });
    } catch(e) {
        console.log(e.name + ": " + e.message);
    }
}

function find() {
    try {
        db.collection('test', function(err, collection) {
            // console.log(collection.find().toArray);
            body=collection.find();
            console.log(collection.find());
        });
    } catch(e) {
        console.log(e.name + ": " + e.message);
    }
}

exports.start = start;
exports.insert = insert;
exports.find = find;