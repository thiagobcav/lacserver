export default function handler(req, res) {
  try {
    const { max } = req.query;
    const maxNum = parseInt(max, 10);

    if (!maxNum || isNaN(maxNum) || maxNum <= 0) {
      res.status(400).send('Parâmetro "max" inválido. Use ?max=10');
      return;
    }

    const random = Math.floor(Math.random() * maxNum) + 1;
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(`(private)<size=-100>teleporte${random}</size><i>Aguarde...</i>`);
  } catch (err) {
    res.status(500).send('Erro interno no servidor.');
  }
}
