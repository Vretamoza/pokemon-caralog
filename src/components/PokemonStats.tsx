import { useFetch } from "../hooks/use-fetch";
import { SheetHeader, SheetTitle } from "./ui/sheet";

type PokemonStatsProps = {
  stats: [{ base_stat: number; stat: { name: string } }];
  sprite: string;
  locationUrl: string;
  name: string;
};

type EncounterLocations = [
  {
    location_area: { name: string };
  }
];

function PokemonStats({
  stats,
  sprite,
  locationUrl = "",
  name,
}: PokemonStatsProps) {
  const { data: locations } = useFetch<EncounterLocations>(locationUrl);

  const formatStatName = (name: string) => {
    return name.split("-").join(" ");
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle className="capitalize text-center">
            {name}
        </SheetTitle>
      </SheetHeader>
      <img className="w-full" src={sprite} alt="Pokemon" />
      <h2 className="font-semibold text-lg">Statistics</h2>
      {stats.map((stat, index) => (
        <div className="font-light" key={index}>
          <span className="capitalize font-medium">{formatStatName(stat.stat.name)}: </span>
          {stat.base_stat}
        </div>
      ))}

      {locations && locations.length > 0 ? (
        <>
          <h2 className="mt-6 font-semibold text-lg">Locations</h2>
          <ul className="list-disc">
            {locations?.map((loc, index) => (
              <li key={index} className="capitalize">
                {formatStatName(loc.location_area.name)}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}

export default PokemonStats;
