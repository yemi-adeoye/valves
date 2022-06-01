require('dotenv').config();
const client = require('./connection');
const dbName = process.env.DATABASE;
const ObjectId = require('mongodb').ObjectId;

/**  Inserts one document into a collection
 *   @param {object} db
 *   @param {object} collection
 *   @param {object} document
 */
const insertOne = async (db, collection, document) => {
  try {
    return await client.db(db).collection(collection).insertOne(document);
  } catch (err) {
    throw err;
  }
};

/**  Inserts many documents into a collection
 *   @param {object} db
 *   @param {object} collection
 *   @param {object} documents
 */
const insertMany = async (db, collection, documents) => {
  try {
    return await client.db(db).collection(collection).insertMany(documents);
  } catch (err) {
    throw err;
  }
};

/**  Updates one document by the object Id
 *   @param {object} db
 *   @param {object} collection
 *   @param {object} document
 *   @param {string} id
 */
const updateOne = async (db, collection, id, document) => {
  try {
    return await client
      .db(db)
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: document });
  } catch (err) {
    throw err;
  }
};

/** Deletes one record by the document id
 *   @param {object} db
 *   @param {object} collection
 *   @param {string} id
 */
const deleteOne = async (db, collection, id) => {
  try {
    return await client
      .db(db)
      .collection(collection)
      .deleteOne({ _id: ObjectId(id) });
  } catch (err) {
    throw err;
  }
};

/** Gets one record by the document id
 *   @param {object} db
 *   @param {object} collection
 *   @param {string} id
 */
const getOne = async (db, collection, filter) => {
  try {
    return await client.db(db).collection(collection).findOne(filter);
  } catch (err) {
    throw err;
  }
};

const getMany = async (db, collection, filter) => {
  try {
    return await client.db(db).collection(collection).find(filter).toArray();
  } catch (err) {
    throw err;
  }
};
/** Gets all documents from a given collection
 *   @param {object} db
 *   @param {object} collection
 */
const getAll = async (db, collection) => {
  try {
    return await client.db(db).collection(collection).find({}).toArray();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  insertOne,
  insertMany,
  updateOne,
  deleteOne,
  getOne,
  getAll,
  getMany,
};
