const Datastore = require('nedb');
const db = new Datastore({ filename: './src/model.db', autoload: true });
const { functionCallLoggerHOF } = require('./utils');

getPositionFromCloud = () =>
  new Promise((resolve, reject) =>
    db
      .find({})
      .sort({ dateTime: -1 })
      .limit(1)
      .exec((err, docs) => (err ? reject(err) : resolve(docs[0].position))),
  );

setPositionToCloud = position =>
  new Promise((resolve, reject) =>
    db.insert(
      { position, dateTime: Date.now() },
      (err, docs) => (err ? reject(err) : resolve(position)),
    ),
  );

exports.getPositionFromCloud = functionCallLoggerHOF(getPositionFromCloud);
exports.setPositionToCloud = functionCallLoggerHOF(setPositionToCloud);
