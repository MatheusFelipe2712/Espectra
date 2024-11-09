const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();  // Carrega variáveis de ambiente do arquivo .env

const app = express();
const port = 5000;

// Habilitar o CORS para todas as origens
app.use(cors());

app.get("/api/search", async (req, res) => {
  const { query } = req.query; // Recebe o parâmetro de pesquisa da query string
  
  // Agora, a chave da API vem do .env
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!query) {
    return res.status(400).send("Query parameter is required.");
  }

  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}`;
    const response = await axios.get(url);
    res.json(response.data.items); // Retorna os vídeos para o frontend
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
    res.status(500).send("Erro interno no servidor");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
