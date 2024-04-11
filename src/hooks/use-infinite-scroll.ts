import { useEffect, useState } from "react"
import { useIntersectionObserver } from "./use-observer"
import { useFetch } from "./use-fetch"

type Pokemon = { name: string; url: string }
type PokemonFetchResponse = { results: Pokemon[]; next: string | null }

export function useInfiniteScroll(loadingRef: React.RefObject<HTMLElement>) {
  const isOnScreen = useIntersectionObserver(loadingRef)
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const { data, isLoading, error } = useFetch<PokemonFetchResponse>(
    `https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`
  )

  useEffect(() => {
    if (data) {
      setPokemonList((prev) => [...prev, ...data.results])
      setHasMore(data.next !== null)
    }
  }, [data])

  useEffect(() => {
    if (isOnScreen && hasMore) setOffset((prev) => prev + 30)
  }, [isOnScreen, hasMore])

  return { pokemonList, isLoading, error }
}