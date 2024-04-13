import { useEffect, useState } from "react";
import { useFetch } from "../hooks/use-fetch"
import { Card } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { COLOR_PER_TYPE } from "@utils";
import PokemonStats from "./PokemonStats";

type Pokemon = {
  abilities: [{ ability: { name: string } }];
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: [{ type: { name: string } }];
  name: string;
  stats: [{ base_stat: number; stat: { name: string } }];
  location_area_encounters: string
};

type colorType = keyof typeof COLOR_PER_TYPE;


function PokemonCard({ url }: { url: string }) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const {data} = useFetch<Pokemon>(url);

  useEffect(() => {
    if (data) setPokemon(data)
  }, [data]);

  const getAbilitiesString = () => {
    const abilities = pokemon?.abilities.map(({ ability }) => ability.name);
    return abilities?.join("/");
  };
  const getTypeString = () => {
    const types = pokemon?.types.map(({ type }) => type.name);
    return types?.join("/");
  };

  const getCardGradient = () => {
    const types = pokemon?.types.map(({ type }) => {
      return COLOR_PER_TYPE[type.name as colorType];
    }) as string[];
    if (types.length > 1)
      return `linear-gradient(${types?.[0]}, ${types?.[1]})`;
    return `${types?.[0]}`;
  };

  if (!pokemon) return null;
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Card className="rounded-xl overflow-hidden flex flex-col drop-shadow-xl hover:drop-shadow-2xl transition-all duration-500 cursor-pointer">
            <div
              className="flex justify-center"
              style={{ background: getCardGradient() }}
            >
              <img
                className="h-60"
                src={pokemon.sprites.front_default}
                alt={`Imagen de ${pokemon.name}`}
              />
            </div>
            <div className="p-8">
              <h2 className="text-4xl font-semibold mb-3 capitalize">
                {pokemon.name}
              </h2>
              <div className="flex text-lg justify-evenly mb-3">
                <div>
                  <span className="font-semibold">Height</span>
                  <p className="font-extralight">{pokemon.height}</p>
                </div>
                <div>
                  <span className="font-semibold">Weight</span>
                  <p className="font-extralight">{pokemon.weight}</p>
                </div>
              </div>
              <div className="text-left w-fit m-auto">
                <div className="font-extralight">
                  <span className="font-semibold">Abilities: </span>
                  {getAbilitiesString()}
                </div>
                <div className="font-extralight">
                  <span className="font-semibold">Type: </span>
                  {getTypeString()}
                </div>
              </div>
            </div>
          </Card>
        </SheetTrigger>
        <SheetContent className="bg-white overflow-y-auto" side="left">
          <PokemonStats name={pokemon.name} locationUrl={pokemon.location_area_encounters} sprite={pokemon.sprites.front_default} stats={pokemon.stats}></PokemonStats>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default PokemonCard;
