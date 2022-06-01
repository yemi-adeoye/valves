const router = require('express').Router();
require('dotenv').config();
const dbName = process.env.DATABASE;
const collection = 'valve';
const ObjectId = require('mongodb').ObjectId;
const auth = require('../middleware/auth');

const {
  insertOne,
  insertMany,
  updateOne,
  deleteOne,
  getOne,
  getAll,
} = require('../db/crud');

router.get('/valves', auth, async (req, res) => {
  try {
    const valves = await getAll(dbName, collection);
    res.json({ valves });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.get('/valve/id/:id', auth, async (req, res) => {
  id = req.params.id;
  if (id) {
    try {
      valve = await getOne(dbName, collection, { _id: ObjectId(id) });
      res.json({ valve });
    } catch (err) {
      res.status(500).json({ msg: 'Server Error' });
    }
  } else {
    res.status(400).json({ msg: 'Bad request' });
  }
});

router.get('/valve/tag/:tag', auth, async (req, res) => {
  tag = req.params.tag;
  console.log(tag);
  if (tag) {
    try {
      valve = await getOne(dbName, collection, { tag });
      res.json({ valve });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: 'Server Error' });
    }
  } else {
    res.status(400).json({ msg: 'Bad request' });
  }
});

router.post('/valve', auth, async (req, res) => {
  const valve = req.body;
  if (valve) {
    try {
      await insertOne(dbName, collection, valve);
      return res.json({ msg: 'Valve inserted successfully' });
    } catch (error) {
      return res.status(501).json({ msg: 'Something went wrong' });
    }
  }
  return res.json({ msg: 'Bad Request' });
});

router.delete('/valve/:id', auth, (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      deleteOne(dbName, collection, id);
      res.json({ msg: 'Valve deleted successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong' });
    }
  }

  res.status(400).json({ msg: 'Bad request' });
});

module.exports = router;
