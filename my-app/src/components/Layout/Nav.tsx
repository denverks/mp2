import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

function Nav() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined} end>
          List
        </NavLink>
        <NavLink to="/gallery" className={({ isActive }) => isActive ? styles.active : undefined}>
          Gallery
        </NavLink>
      </nav>
    </header>
  );
}

export default Nav;

