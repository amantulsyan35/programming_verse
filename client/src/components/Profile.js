import React from 'react';

import { Link } from 'react-router-dom';

const Profile = ({ title, description, id }) => {
  return (
    <div className='card mb-4'>
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>{description}</p>
        <Link to={`/programs/${id}`} className='btn btn-primary'>
          See Post
        </Link>
      </div>
    </div>
  );
};

export default Profile;
