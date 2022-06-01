const dbName = process.env.DATABASE;
const collection = 'record';
const router = require('express').Router();
const { getMany, getOne, deleteOne, insertOne } = require('../db/crud');

router.get('/records/:tag', async (req, res) => {
  const tag = req.params.tag;
  const query = { for: tag };
  if (tag) {
    try {
      const records = await getMany(dbName, collection, query);
      return res.json({ records });
    } catch (error) {
      throw error;
    }
  }
  return res.status(400).json({ msg: 'Bad request' });
});

router.get('/record/:id', async (req, res) => {
  id = req.params.id;
  if (id) {
    try {
      record = await getOne(dbName, collection, { _id: ObjectId(id) });
      res.json({ record });
    } catch (err) {
      throw err;
      res.status(500).json({ msg: 'Server Error' });
    }
  } else {
    res.status(400).json({ msg: 'Bad request' });
  }
});

router.post('/record', async (req, res) => {
  const record = req.body;
  record.date = new Date(record.date);
  if (record) {
    try {
      await insertOne(dbName, collection, record);
      return res.json({ msg: 'Record inserted successfully' });
    } catch (error) {
      throw error;
      return res.status(501).json({ msg: 'Something went wrong' });
    }
  }
  return res.json({ msg: 'Bad Request' });
});

router.delete('/record/:id', (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      deleteOne(dbName, collection, id);
      return res.json({ msg: 'Valve deleted successfully' });
    } catch (error) {
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  }

  return res.status(400).json({ msg: 'Bad request' });
});

module.exports = router;
