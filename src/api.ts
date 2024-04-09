export const fetchPokemonList = async (offset: number) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const fetchPokemon = async (url: string) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export {}