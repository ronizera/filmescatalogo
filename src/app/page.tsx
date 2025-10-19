"use client"

import { div } from "framer-motion/client";
import { useEffect, useState } from "react"

type Filme = {
  Id: string
  Title: string
  Year: string
  Poster: string
  Type: string
}


export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([])
  const [busca, setBusca] = useState<string>("")
  const [erro, setErro] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const buscarFilmes = async () => {
    if(busca.trim() === "") return

    setErro("")
    setLoading(true)
  }


  return (
    <div>

    </div>
  );
}
