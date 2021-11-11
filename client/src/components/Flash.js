import React from 'react';

const Flash = ({ success }) => {
  if (success && success.length) {
    return (
      <div
        className='alert alert-success alert-dismissible fade show'
        role='alert'
      >
        hii
        <button
          type='button'
          class='close'
          data-dismiss='alert'
          aria-label='Close'
        >
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    );
  }
};

export default Flash;
