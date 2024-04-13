import { useRef } from "react"
import { useInfiniteScroll } from "./hooks/use-infinite-scroll"
import PokemonCard from "@components/PokemonCard.tsx"
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from "@components/ui/drawer"
import GeneralStats from "@components/GeneralStats"

function App() {
  const loadingRef = useRef<HTMLDivElement>(null)
  const { pokemonList, isLoading, error } = useInfiniteScroll(loadingRef)
  if (error) return <span>There was an error. Please try again.</span>
  return (
    <>
        <header className="py-4 px-10 border-b border-slate-300">
        <Drawer>
          <DrawerContent className  ="bg-white min-h-96">
          <DrawerTitle className="text-center text-3xl mb-12">Pokemons per type</DrawerTitle>
            <GeneralStats></GeneralStats>
          </DrawerContent>
          <DrawerTrigger asChild>
            <button className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm">Statistics</button>
          </DrawerTrigger>
        </Drawer>
        </header>
        
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