import { BarChart, DonutChart  } from '@tremor/react';
import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/use-fetch'

type PokemonType = {
    pokemon: [{pokemon: {name: string}}]
}

type PokemonTypeResults = {
    results: [{url: string, name: string}]
}

const fetchPokemonType = async (url: string) => {
    try {
        const response = await fetch(url)
        const data = await response.json() as PokemonType;
        return data?.pokemon;
    } catch (error) {
        console.log(error)
        return []
    }
}

function GeneralStats() {
    const [pokemonTypes, setPokemonTypes] = useState<{name: string, Quantity: number}[]>([])
    const {data} = useFetch<PokemonTypeResults>('https://pokeapi.co/api/v2/type')

    const capitalize = (value: string) => value[0].toUpperCase() + value.slice(1)

    useEffect(() => {
        const results = data ? data.results : []
        const fetchAllTypes = async () => {
            const allTypes = await Promise.all(
                results.map((result) => fetchPokemonType(result.url)) 
            )
            results.forEach((res, index) => {
                setPokemonTypes((oldValue) => {
                    const pokemonsPerType = allTypes[index].length
                    return [...oldValue, {name: capitalize(res.name), Quantity: pokemonsPerType}]
                })
            })
        }
        fetchAllTypes()
    }, [data])

    const setPokemonFilter = (name: string) => {
        location.search = `?type=${name.toLowerCase()}`
    }
    return (
        <>
        <DonutChart
            data={pokemonTypes.slice(0, 18)}
            category="Quantity"
            index="name"
            variant="pie"
            onValueChange={({name}) => setPokemonFilter(name)}
        />
        <BarChart
            data={pokemonTypes.slice(0, 18)}
            index="name"
            categories={['Quantity']}
            colors={['blue']}
            yAxisWidth={48}
            onValueChange={({name}) => setPokemonFilter(name)}
        />
        </>
    )
}

export default GeneralStats