const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getAll, insertOne, getOne } = require('../db/crud');

const postUser = async (user) => {
  user.fullName = `${user.fName} ${user.lName}`;

  salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

  token = await jwt.sign({ email: user.email }, 'secret', {
    expiresIn: 3600,
  });

  insertOne('valves', 'user', user); // works!

  return { user, token };
};

module.exports = { postUser };
