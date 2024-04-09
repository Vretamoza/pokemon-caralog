import { useEffect, useState } from 'react'
import { fetchPokemon } from '@api'
import { Card } from './ui/card';
import { COLOR_PER_TYPE } from '@utils';

type Pokemon = {
  abilities: [{ability: {name: string}}],
  height: number,
  weight: number,
  sprites: {front_default: string},
  types: [{type: {name: string }}],
  name: string
}

type colorType = keyof typeof COLOR_PER_TYPE

function PokemonCard({url}: {url: string}) {

  const [pokemon, setPokemon] = useState <Pokemon> ();

  useEffect(() => {
    fetchPokemon(url)
    .then((data) => {
      setPokemon(data)
    })
    .catch((error) => {
      console.error(error);
    })
  }, [url])

  const getAbilitiesString = () => {
    const abilities = pokemon?.abilities.map(({ability}) => ability.name)
    return abilities?.join('/')
  }
  const getTypeString = () => {
    const types = pokemon?.types.map(({type}) => type.name)
    return types?.join('/')
  }

  const getCardGradient = () => {
    const types = pokemon?.types.map(({type}) => {
      return COLOR_PER_TYPE[type.name as colorType]
    }) as string[]
    if (types.length > 1) return `linear-gradient(${types?.[0]}, ${types?.[1]})`
    return `${types?.[0]}`
  }

  if (!pokemon) return null
  return (
    <>
    <Card className="rounded-xl overflow-hidden flex flex-col drop-shadow-xl hover:drop-shadow-2xl transition-all duration-500 cursor-pointer">
      <div className="flex justify-center" style={{background: getCardGradient()}}>
        <img className="h-60" src={pokemon.sprites.front_default} alt={`Imagen de ${pokemon.name}`}/>
      </div>
      <div className="p-8">
        <h2 className="text-4xl font-semibold mb-3 capitalize">{pokemon.name}</h2>
        <div className="flex text-lg justify-evenly mb-3">
          <div>
            <span>Height</span>
            <p>{pokemon.height}</p>
          </div>
          <div>
            <span>Weight</span>
            <p>{pokemon.weight}</p>
          </div>
        </div>
        <div>Abilities: {getAbilitiesString()}</div>
        <div>Type: {getTypeString()}</div>
      </div>
    </Card>
    </>
  )
}

export default PokemonCard
