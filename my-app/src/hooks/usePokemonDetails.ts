import { useEffect, useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { getPokemonByName } from '../services/pokeApi';

export function usePokemonDetails(name: string | undefined) {
  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getPokemonByName(name);
        if (mounted) setData(res);
      } catch (e) {
        if (mounted) setError('Failed to load Pokémon');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [name]);

  return { data, loading, error };
}

