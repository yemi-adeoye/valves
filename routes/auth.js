const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { getAll, insertOne, getOne } = require('../db/crud');
const { postUser } = require('../helper/user');

router.post('/auth/register', async (req, res) => {
  const rawUser = req.body;

  try {
    const { user, token } = await postUser(rawUser);
    return res.json({ user, token });
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong' });
  }

  /*try {
    salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    token = await jwt.sign({ email: user.email }, 'secret', {
      expiresIn: 3600,
    });
    insertOne('valves', 'user', user); // works!

    return res.json({ user, token });
  } catch (error) {
    throw error;
  }*/

  /* // set salt
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    // hash password
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      passwordHash = hash;
      return res.json({ passwordHash });
    });
  });*/
});

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await getOne('valves', 'user', { email });
  console.log(user);

  if (!user) {
    console.log('not found');
    return res.json({ msg: 'Invalid Credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log(isMatch);
    return res.json({ msg: 'Invalid Credentials' });
  }

  token = await jwt.sign({ email: user.email }, 'secret', {
    expiresIn: 3600,
  });
  return res.json({ token, user });
});

module.exports = router;
