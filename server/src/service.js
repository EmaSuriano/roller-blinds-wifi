var Datastore = require('nedb'),
  db = new Datastore({ filename: './src/model.db', autoload: true });

exports.getPositionFromCloud = function() {
  return new Promise((resolve, reject) =>
    db
      .find({})
      .sort({ dateTime: -1 })
      .limit(1)
      .exec(function(err, docs) {
        if (err) return reject(err);
        resolve(docs[0].position);
      }),
  );
};

exports.setPositionToCloud = function(position) {
  db.insert({ position, dateTime: Date.now() }, function(err, docs) {
    console.log(docs);
  });

  console.log('position save into cloud');
  return true;
};
