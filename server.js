const express = require('express');
app = express();

/** Connect to the database */
const client = require('./db/connection');
const { getAll, insertOne } = require('./db/crud');

app.get('/', async (req, res) => {
  const record = {
    for: '120-PK-01',
    date: new Date('12/11/2022'),
    calibration: 10.2,
    recommendation:
      'Valve has been in service for 12 plus years and might soon need to be replaced. Manufacturers should be contacted ASAP',
  };

  const user = {
    fName: 'Adeyemi',
    lName: 'Adeoye',
    password: 'somehashedpassword',
    designation: 'Pneumatic Technician',
    email: 'a.adeoye5@gmail.com',
  };

  user.fullName = user.fName + ' ' + user.lName;

  insertOne('valves', 'valve', valve);
  //insertOne('valves', 'record', record); // works!

  const valves = await getAll('valves', 'valve');
  return res.json({ valves });
});
// body parser
app.use(express.json());

app.use('/api', require('./routes/valve.js'));
app.use('/api', require('./routes/user.js'));
app.use('/api', require('./routes/record.js'));
app.use('/api', require('./routes/auth.js'));

app.listen('5000', (res, req) => {
  console.log('Running on port 5000');
});
