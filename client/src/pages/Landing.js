import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Landing.css';

const Landing = () => {
  return (
    <div className=' mainBody d-flex text-center text-white bg-dark '>
      <div className='cover-container d-flex w-100 h-100 p-3 mx-auto flex-column'>
        <main className='px-auto my-auto'>
          <h1 className='text-center mx-auto'>ProgShow</h1>
          <p className='lead'>
            {' '}
            Welcome to ProgShow! Jump right in and explore different programs.{' '}
            <br />
            Feel free to share some of your own and comment on others!
          </p>
          <Link
            to='/programs'
            className='btn btn-md btn-secondary font-weight-bold border-white bg-white'
          >
            View Programs
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Landing;
