import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const Navbar = ({ data, handleData }) => {
  let history = useHistory();

  const logout = async () => {
    await axios.get('/api/auth/logout');
    handleData(null);
    window.localStorage.clear();
    history.push('/');
    alert('logout');
  };

  return (
    <nav className='navbar sticky-top navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='#'>
          Progshow
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/programs'>
                Programs
              </Link>
            </li>

            {data !== null && (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/programs/new'>
                    New Program
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div
            className='collapse navbar-collapse flex-grow-1 text-right'
            id='navbarNav'
          >
            <ul className='navbar-nav ms-auto flex-nowrap '>
              {data === null && (
                <>
                  <li className='nav-item'>
                    <Link
                      className='btn btn-outline-light btn-sm ms-2'
                      to='/auth/login'
                    >
                      Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='btn btn-outline-light btn-sm ms-2'
                      to='/auth/register'
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
              {data !== null && (
                <>
                  <li className='nav-item'>
                    <button
                      onClick={logout}
                      className='btn btn-outline-light btn-sm ms-2'
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
