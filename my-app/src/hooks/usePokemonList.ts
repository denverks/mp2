import { useEffect, useState } from 'react';
import { NamedAPIResource } from 'pokenode-ts';
import { listPokemon } from '../services/pokeApi';

export function usePokemonList(initialLimit = 50) {
  const [items, setItems] = useState<NamedAPIResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await listPokemon(0, initialLimit);
        if (mounted) setItems(res.results);
      } catch (e) {
        if (mounted) setError('Failed to load Pokémon list');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [initialLimit]);

  return { items, loading, error };
}

