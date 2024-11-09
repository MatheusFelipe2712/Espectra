import React, { useState } from "react";
import axios from "axios";
import "../styles/main.css";

const YouTubeSearch = () => {
  const [query, setQuery] = useState("");  // Para armazenar o que o usuário digita
  const [videos, setVideos] = useState([]);  // Para armazenar os resultados da pesquisa

  const handleSearch = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      console.log("Dados recebidos:", response.data);
      setVideos(response.data);  // Atualiza o estado com os vídeos
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    }
  };

  return (
    <main>
      <input
        type="search"
        className="search"
        placeholder="PESQUISE... 💡"
        value={query}
        onChange={(e) => setQuery(e.target.value)}  // Atualiza o estado conforme o usuário digita
      />
      <button onClick={handleSearch}>Pesquisar</button>

      <div>
        {videos.map((video) => (
          <div key={video.id.videoId}>
            <h3>{video.snippet.title}</h3>
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default YouTubeSearch;
