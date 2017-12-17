const Datastore = require('nedb');
const db = new Datastore({ filename: './src/model.db', autoload: true });
const { functionCallLoggerHOF } = require('./utils');

getPositionFromDB = () =>
  new Promise((resolve, reject) =>
    db
      .find({})
      .sort({ dateTime: -1 })
      .limit(1)
      .exec((err, docs) => (err ? reject(err) : resolve(docs[0].position))),
  );

setPositionToDB = position =>
  new Promise((resolve, reject) =>
    db.insert(
      { position, dateTime: Date.now() },
      (err, docs) => (err ? reject(err) : resolve(position)),
    ),
  );

module.exports = {
  getPositionFromDB: functionCallLoggerHOF(getPositionFromDB),
  setPositionToDB: functionCallLoggerHOF(setPositionToDB),
};
