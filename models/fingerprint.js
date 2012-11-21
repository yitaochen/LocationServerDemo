// fingerprint.js
// by vampirefan
// Fingerprint Model: save, findOne, findAll in mongodb
// -----------------------------------------------------

var mongodb = require('./db');

function Fingerprint(fingerprint) {
  this.locationId = fingerprint.locationId;
  this.bearing = fingerprint.bearing;
  this.wapInfo = fingerprint.wapInfo;
}

module.exports = Fingerprint;

Fingerprint.prototype.save = function save(callback) {
  // save to mongodb
  var fingerprint = {
    locationId: this.locationId,
    bearing: this.bearing,
    wapInfo: this.wapInfo
  };
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    // find fingerprints collection
    db.collection('fingerprints', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      // add index for locationId
      collection.ensureIndex('locationId', {
        unique: true
      });
      // insert fingerprint into colletion
      collection.insert(fingerprint, {
        safe: true
      }, function(err, fingerprint) {
        mongodb.close();
        callback(err, fingerprint);
      });
    });
  });
};

Fingerprint.getOne = function getOne(getLocationId, callback) {
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    // find fingerprints collection
    db.collection('fingerprints', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      // find docs which locationId = getLocationId
      collection.findOne({
        locationId: getLocationId
      }, function(err, doc) {
        mongodb.close();
        if(doc) {
          // Object Fingerprint
          var fingerprint = new Fingerprint(doc);
          return callback(err, fingerprint);
        } else {
          return callback(err, null);
        }
      });
    });
  });
};

Fingerprint.getAll = function getAll(callback) {
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    // find fingerprint collection
    db.collection('fingerprints', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      // find docs which locationId = fingerprint.locationId
      collection.find().toArray(function(err, docs) {
        mongodb.close();
        if(docs) {
          // Object Fingerprint
          var fingerprints = docs;
          return callback(err, fingerprints);
        } else {
          return callback(err, null);
        }
      });
    });
  });
};