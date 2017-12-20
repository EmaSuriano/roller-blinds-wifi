const datastore = require('nedb-promise');
const { withDebugHOF } = require('./utils');
const { ERROR_MESSAGE, DEBUG } = require('./constants');

let db = datastore({ filename: './src/database.db', autoload: true });

const getPosition = async () => {
  try {
    const document = await db
      .cfind({})
      .sort({ dateTime: -1 })
      .limit(1)
      .exec();

    return document[0].position;
  } catch (error) {
    throw new Error(ERROR_MESSAGE.DATABASE_GET_ERROR);
  }
};

const setPosition = async position => {
  try {
    const newPositionRecord = { position, dateTime: Date.now() };
    await db.insert(newPositionRecord);
    return position;
  } catch (error) {
    throw new Error(ERROR_MESSAGE.DATABASE_INSERT_ERROR);
  }
};

module.exports = {
  getPosition: withDebugHOF(getPosition),
  setPosition: withDebugHOF(setPosition),
};
