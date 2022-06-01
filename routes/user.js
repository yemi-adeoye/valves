const router = require('express').Router();
const { postUser } = require('../helper/user');

router.get('/users', (req, res) => {
  console.log('gets all');
  res.send('Gets all user');
});

router.get('/user/:id', (req, res) => {
  console.log(req.params.id);
  res.send('Gets one user');
});

router.post('/user', async (req, res) => {
  const rawUser = req.body;
  console.log(rawUser);
  if (rawUser) {
    try {
      const { user, token } = await postUser(rawUser);
      return res.json({ user, token });
    } catch (error) {
      //throw error;
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  }
  return res.status(400).json({ msg: 'Bad Request' });
});

router.delete('/user', (req, res) => {
  console.log('deletes a user');
  res.send('Deletes a user');
});

module.exports = router;
