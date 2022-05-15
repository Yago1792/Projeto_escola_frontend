import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
  FaCog,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Nav } from './styled';
import * as actions from '../../store/module/auth/actions';
import history from '../../services/history';

export default function Header() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user.nome);
  const userEmail = useSelector((state) => state.auth.user.email);
  const userId = useSelector((state) => state.auth.user.id);

  function handleLogout(e) {
    e.preventDefault();

    dispatch(actions.loginFailure());

    history.push('/login');
  }

  function handleDelete(e, id) {
    e.preventDefault();

    dispatch(actions.loginFailure());

    history.push('/login');
  }

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>

      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <>
          <Link to="/settings">
            <FaCog size={24} />
          </Link>

          <Link to="/logout" onClick={handleLogout}>
            <FaPowerOff size={24} />
          </Link>

          <div>
            <FaCircle size={10} color="66ff33" />
            <p>{`Olá, ${user} (${userEmail})`}</p>
          </div>
        </>
      ) : (
        <>
          <Link to="/login">
            <FaSignInAlt size={24} />
          </Link>

          <div>
            <FaCircle size={10} color="bbb" />
            <p>{` Não logado`} </p>
          </div>
        </>
      )}
    </Nav>
  );
}
