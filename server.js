const express = require('express');

const data = require('./data.json');

const app = express();

app.get('/api/projects', (req, res) => {
  res.json(data);
});

app.listen(8080, () => {
  console.log('Express server listening on port 8080!\n');
});
