const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const DEFAULT_PORT = 6000;
const PORT = process.env.PORT || DEFAULT_PORT;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send({ message: 'ok' });
});

app.listen(PORT, () => {
  console.log(`service start at ${PORT}`);
});
