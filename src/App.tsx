import { useRef } from "react"
import { useInfiniteScroll } from "./hooks/use-infinite-scroll"
import PokemonCard from "@components/PokemonCard.tsx"

function App() {
  const loadingRef = useRef<HTMLDivElement>(null)
  const { pokemonList, isLoading, error } = useInfiniteScroll(loadingRef)

  if (error) return <span>There was an error. Please try again.</span>
  return (
    <>
      <div className="grid grid-cols-3 gap-14 py-14 px-10 min-h-screen">
        {pokemonList.map((pokemon, index) => {
          return <PokemonCard key={index} url={pokemon.url}></PokemonCard>
        })}
      </div>
      <div
        ref={loadingRef}
        className="flex justify-center items-center w-full h-20"
      >
        {isLoading ? (
          <span className="text-2xl">Loading...</span>
        ) : (
          <span className="text-2xl">Fin de la lista</span>
        )}
      </div>
    </>
  )
}

export default App