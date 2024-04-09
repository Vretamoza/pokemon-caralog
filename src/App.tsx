import { useEffect, useState } from 'react'

import './App.css'
import { fetchPokemonList } from './api'
import PokemonCard from '@components/PokemonCard.tsx';

type PokemonList = {results: {name: string, url: string}[]}

function App() {

  const [pokemonList, setPokemonList] = useState <PokemonList> ();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchPokemonList(offset)
    .then((data) => {
      setPokemonList(data)
    })
    .catch((error) => {
      console.error(error);
    })
  }, [offset])

  return (
    <>
    <div className="grid grid-cols-3 gap-14">
      { pokemonList?.results.map((pokemon) => {
        return <PokemonCard url={pokemon.url}></PokemonCard>
      }) }
    </div>
    </>
  )
}

export default App
