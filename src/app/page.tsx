"use client"

import { div } from "framer-motion/client";
import { useEffect, useState } from "react"

type Filme = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
};

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([])
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const buscarFilmes = async () => {
    setErro("")
    setLoading(true)

    try{
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_KEY}&s=${encodeURIComponent(
          busca
        )}`
      );

      const data = await res.json()
      if(data.Response === "False"){
        throw new Error(data.Error || "Erro ao buscar filmes")
      }
      setFilmes(data.Search)
    }catch (err: unknown){
      if(err instanceof Error){
        setErro(err.message)
      }else{
        setErro("Erro desconhecido")
      }
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    setBusca("batman")
    buscarFilmes()
  }, [])


  return (
    <div>
        <h1>Catalogo</h1>
        <div>
          <input type="text" value={busca}
          onChange={(e) => setBusca(e.target.value)} placeholder="Buscar Filme" />
          <button onClick={buscarFilmes}>Buscar</button>
        </div>

        {loading && <p>Carregando...</p>}
        {erro && <p>{erro}</p>}

        <div>
          {filmes.map((filme) => (
            <div key={filme.imdbID}>
                <h2>{filme.Title}</h2>
                <p>{filme.Year}</p>
            </div>
          ))}
        </div>
    </div>
  );
}
