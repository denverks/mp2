import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './GalleryPage.module.css';
import { usePokemonCatalog } from '../hooks/usePokemonCatalog';

function GalleryPage() {
  const { all, loading, error } = usePokemonCatalog(151);
  const allTypes = useMemo(() => {
    const set = new Set<string>();
    all.forEach((p) => p.types.forEach((t) => set.add(t.type.name)));
    return Array.from(set).sort();
  }, [all]);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (selected.length === 0) return all;
    return all.filter((p) => p.types.some((t) => selected.includes(t.type.name)));
  }, [all, selected]);

  const toggleType = (t: string) => {
    setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  return (
    <main className={styles.container}>
      <h1>Pokémon Gallery</h1>

      <section className={styles.filters}>
        {allTypes.map((t) => (
          <label key={t} className={styles.filter}>
            <input
              type="checkbox"
              checked={selected.includes(t)}
              onChange={() => toggleType(t)}
            />
            <span className={styles.type}>{t}</span>
          </label>
        ))}
      </section>

      {loading && <p>Loading gallery…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <ul className={styles.grid}>
          {filtered.map((p) => {
            const img =
              p.sprites.other?.['official-artwork']?.front_default ||
              p.sprites.front_default ||
              undefined;
            return (
              <li key={p.id} className={styles.card}>
                <Link to={`/pokemon/${p.name}`} className={styles.link}>
                  {img && <img src={img} alt={p.name} />}
                  <div className={styles.caption}>
                    <span className={styles.name}>{p.name}</span>
                    <span className={styles.types}>
                      {p.types.map((t) => t.type.name).join(' / ')}
                    </span>
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

export default GalleryPage;
