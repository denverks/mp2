import { PokemonClient, NamedAPIResourceList, Pokemon } from 'pokenode-ts';

// Configure client with cache (uses axios-cache-interceptor under the hood)
export const pokemonClient = new PokemonClient({
  cacheOptions: { ttl: 1000 * 60 * 10 },
});

// Fetch a paginated list of Pokémon names (no details)
export async function listPokemon(offset = 0, limit = 50): Promise<NamedAPIResourceList> {
  return pokemonClient.listPokemons(offset, limit);
}

// Fetch full Pokémon details by name
export async function getPokemonByName(name: string): Promise<Pokemon> {
  return pokemonClient.getPokemonByName(name);
}

export async function getManyPokemonByName(names: string[]): Promise<Pokemon[]> {
  const results = await Promise.all(names.map((n) => getPokemonByName(n)));
  return results;
}
