import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Parâmetro 'url' é obrigatório." });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();

    // Regex para séries e filmes
    const regexSeries = /https:\/\/oneplayer\.site\/player\/series\/\?i=\d+&e=\d+&t=\d+&s=[A-Z0-9]+/g;
    const regexFilmes = /https:\/\/oneplayer\.site\/player\/filmes\/\?i=tt\d+&s=[A-Z0-9]+/g;

    const series = html.match(regexSeries) || [];
    const filmes = html.match(regexFilmes) || [];

    const urls = [...series, ...filmes];

    if (urls.length > 0) {
      return res.status(200).json({ url: urls[0] });
    } else {
      return res.status(404).json({ error: "Nenhum player encontrado." });
    }

  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar página.", details: err.message });
  }
}
