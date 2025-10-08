import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ListPage.module.css';
import { usePokemonCatalog, sortPokemon, SortKey, SortOrder } from '../hooks/usePokemonCatalog';
import { formatKilograms, formatMeters } from '../utils/units';
import { useDebouncedValue } from '../utils/useDebouncedValue';

function ListPage() {
  const { all, loading, error } = usePokemonCatalog(151);
  const [q, setQ] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('height');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const query = useDebouncedValue(q, 250);

  const filtered = useMemo(() => {
    const base = query ? all.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())) : all;
    return sortPokemon(base, sortKey, sortOrder);
  }, [all, query, sortKey, sortOrder]);

  return (
    <main className={styles.container}>
      <h1>Pokémon List</h1>

      <section className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.label}>Search</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. pikachu"
            className={styles.input}
            aria-label="Search by name"
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Sort by</span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className={styles.select}
          >
            <option value="height">Height</option>
            <option value="weight">Weight</option>
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Order</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as SortOrder)}
            className={styles.select}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </section>

      {loading && <p>Loading Pokémon…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <ul className={styles.list}>
          {filtered.map((p) => {
            const img =
              p.sprites.other?.['official-artwork']?.front_default ||
              p.sprites.front_default ||
              undefined;
            return (
              <li key={p.id} className={styles.item}>
                <Link to={`/pokemon/${p.name}`} className={styles.card}>
                  {img && <img src={img} alt={p.name} className={styles.thumb} />}
                  <div className={styles.meta}>
                    <h2 className={styles.name}>{p.name}</h2>
                    <div className={styles.stats}>
                      <span>Height: {formatMeters(p.height)}</span>
                      <span>Weight: {formatKilograms(p.weight)}</span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default ListPage;
