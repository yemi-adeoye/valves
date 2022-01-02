const express = require('express');

app = express();

app.get('/', (req, res) => {
  return res.json({ msg: 'welcome' });
});

app.listen('5000', (res, req) => {
  return 'Running on port 5000';
});
