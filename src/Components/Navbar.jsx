import React from 'react';
import s from './navbar.module.scss';


const Navbar = () => {
  return (
    <>
      <nav className={s.navbar}>
        <h1 className={s.navbar__text}>GitHub Finder</h1>
      </nav>
    </>
  );
};

export default Navbar;
