import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/gists'>User Gists</Link>
        </li>
        <li>
          <Link to='/gists/favorites'>Favorite Gists</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
