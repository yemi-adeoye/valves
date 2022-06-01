const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ msg: 'Not Authorized' });

  try {
    const decoded = jwt.verify(token, 'secret');

    req.email = decoded.email;

    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Not Authorized' });
  }
};

module.exports = auth;
