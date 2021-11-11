import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, title, description, language, image }) => {
  return (
    <div className='card mb-3 ' key={id}>
      <div className='row'>
        <div className='col-md-4'>
          <img className='img-fluid' alt='' src={image} />
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <p className='card-tex'>{description}</p>
            <p className='card-text'>
              <small className='text-muted'>JAVASCRIPT</small>
            </p>
            <Link className='btn btn-primary' to={`/programs/${id}`}>
              View Code
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
