import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './DetailPage.module.css';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { usePokemonCatalog } from '../hooks/usePokemonCatalog';
import { formatKilograms, formatMeters } from '../utils/units';

function DetailPage() {
  const { name } = useParams<{ name: string }>();
  const { data, loading, error } = usePokemonDetails(name);
  const { all } = usePokemonCatalog(151);

  const order = useMemo(() => all.slice().sort((a, b) => a.id - b.id), [all]);
  const currentIndex = useMemo(
    () => (name ? order.findIndex((p) => p.name === name) : -1),
    [order, name]
  );
  const prev = currentIndex > -1 ? order[(currentIndex - 1 + order.length) % order.length] : null;
  const next = currentIndex > -1 ? order[(currentIndex + 1) % order.length] : null;

  return (
    <main className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <Link to="/">List</Link> / <Link to="/gallery">Gallery</Link>
      </nav>
      {loading && <p>Loading…</p>}
      {error && <p className={styles.error}>{error}</p>}
      {data && (
        <article className={styles.card}>
          <header className={styles.header}>
            <h1 className={styles.title}>{data.name}</h1>
            <span className={styles.dex}>#{data.id}</span>
          </header>
          <div className={styles.media}>
            {(
              data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default
            ) && (
              <img
                src={
                  data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default || ''
                }
                alt={data.name}
              />
            )}
          </div>
          <section className={styles.info}>
            <div>
              <strong>Height:</strong> {formatMeters(data.height)}
            </div>
            <div>
              <strong>Weight:</strong> {formatKilograms(data.weight)}
            </div>
            <div>
              <strong>Types:</strong> {data.types.map((t) => t.type.name).join(' / ')}
            </div>
          </section>
          <footer className={styles.footer}>
            {prev && <Link to={`/pokemon/${prev.name}`} className={styles.navbtn}>← {prev.name}</Link>}
            {next && <Link to={`/pokemon/${next.name}`} className={styles.navbtn}>{next.name} →</Link>}
          </footer>
        </article>
      )}
    </main>
  );
}

export default DetailPage;
