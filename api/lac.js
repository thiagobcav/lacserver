const express = require('express');
const app = express();
const port = 3000;

app.get('/teleporte', (req, res) => {
  const max = parseInt(req.query.max, 10);

  if (!max || isNaN(max) || max <= 0) {
    return res.status(400).send('Parâmetro "max" inválido. Use ?max=10 por exemplo.');
  }

  const randomNumber = Math.floor(Math.random() * max) + 1;
  res.send(`teleporte${randomNumber}`);
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
