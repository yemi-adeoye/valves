require('dotenv').config();
const dbName = process.env.DATABASE;
const collection = 'valve';
const { getAll, insertOne, getOne } = require('../db/crud');

/**
 * @param {object} query
 */
const deleteValve = (query, id) => {
  // deletes a valve based on the given query
  deleteOne(dbName, collection, id);
};
