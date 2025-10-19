"use client";

import { useState, useEffect } from "react";

type FilmeOMDb = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
};

export default function Home() {
  const [filmes, setFilmes] = useState<FilmeOMDb[]>([]);
  const [busca, setBusca] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string>("");

  const buscarFilmes = async () => {
    if (busca.trim() === "") return;

    setLoading(true);
    setErro("");

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}&s=${encodeURIComponent(
          busca
        )}`
      );

      const data = await res.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "Filme não encontrado.");
      }

      setFilmes(data.Search);
    } catch (err: unknown) {
      if (err instanceof Error) setErro(err.message);
      else setErro("Erro desconhecido ao buscar filmes.");
    } finally {
      setLoading(false);
    }
  };

  // Busca inicial ao abrir a página
  useEffect(() => {
    setBusca("dune");
    buscarFilmes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 text-white bg-gradient-to-br from-gray-900 to-gray-700">
      <h1 className="text-4xl font-bold mb-6">🎬 Catálogo de Filmes</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar filme..."
          className="px-4 py-2 rounded-lg text-black w-72 outline-none bg-white"
        />
        <button
          onClick={buscarFilmes}
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>

      {loading && <p className="text-lg animate-pulse">Carregando...</p>}
      {erro && <p className="text-red-400">{erro}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {filmes.map((filme) => (
          <div
            key={filme.imdbID}
            className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-center shadow-md hover:scale-105 transition-transform"
          >
            <img
              src={
                filme.Poster !== "N/A"
                  ? filme.Poster
                  : "https://via.placeholder.com/300x450?text=Sem+Imagem"
              }
              alt={filme.Title}
              className="w-full h-80 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{filme.Title}</h2>
            <p className="text-sm opacity-80">{filme.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
