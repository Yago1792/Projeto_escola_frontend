import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Nav } from './styled';

export default function Header() {
  // eslint-disable-next-line
  const botaoClicado = useSelector((state) => state.exampleReducer.botaoClicado);

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
      <Link to="/hheher">
        <FaSignInAlt size={24} />
      </Link>
      <span style={{ color: 'white' }}>
        {botaoClicado ? 'Status: Active' : 'Status: Inactive'}
      </span>
    </Nav>
  );
}
