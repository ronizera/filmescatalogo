"use client"

import { useState } from "react"

type Filme = {
  id: number
  title: string
  poster_path: string
  overview: string
  release_date: string
}

export default function Home() {
  const [filmes, setFilmes] = useState<Filme[]>([])
  const [erro, setErro] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const buscarFilmes = async () => {
    setErro("")
    setLoading(true)

    try{
      
    }
  }


  return (
    <div>

    </div>
  );
}
