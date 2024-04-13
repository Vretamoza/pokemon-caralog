import { useEffect, useState, useMemo } from "react"
import { useIntersectionObserver } from "./use-observer"
import { useFetch } from "./use-fetch"

type Pokemon = { name: string; url: string }
type PokemonFetchResponse = { results: Pokemon[]; next: string | null }
type PokemonType = {
  pokemon: [{pokemon: {name: string}}]
}

export function useInfiniteScroll(loadingRef: React.RefObject<HTMLElement>) {
  const isOnScreen = useIntersectionObserver(loadingRef)
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)

  const params = useMemo(() => new URLSearchParams(window.location.search), [])

  const { data: dataFiltered } = useFetch<PokemonType>(`https://pokeapi.co/api/v2/type/${params.get('type') ?? ''}`)
  const { data, isLoading, error } = useFetch<PokemonFetchResponse>(
    `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`
  )

  useEffect(() => {
    if (params.get('type')) {
      const refactoredData = dataFiltered?.pokemon.map(({pokemon}) => ({name: pokemon.name, url: pokemon.url}))
      setPokemonList(refactoredData ?? [])
    }
    else if (data) {
      setPokemonList((prev) => [...prev, ...data.results])
      setHasMore(data.next !== null)
    }
  }, [data, params, dataFiltered])

  useEffect(() => {
    if (isOnScreen && hasMore) setOffset((prev) => prev + 30)
  }, [isOnScreen, hasMore])

  return { pokemonList, isLoading, error }
}