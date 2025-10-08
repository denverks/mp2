import { useEffect, useMemo, useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { getManyPokemonByName, listPokemon } from '../services/pokeApi';

export type SortKey = 'height' | 'weight';
export type SortOrder = 'asc' | 'desc';

export function usePokemonCatalog(count = 151) {
  const [all, setAll] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        // Fetch first `count` names then hydrate details
        const list = await listPokemon(0, count);
        const names = list.results.map((r) => r.name);
        const details = await getManyPokemonByName(names);
        if (mounted) setAll(details);
      } catch (e) {
        if (mounted) setError('Failed to load Pokémon catalog');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [count]);

  return { all, loading, error };
}

export function sortPokemon(
  items: Pokemon[],
  key: SortKey,
  order: SortOrder
): Pokemon[] {
  const dir = order === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av === bv) return a.name.localeCompare(b.name);
    return (av - bv) * dir;
  });
}

