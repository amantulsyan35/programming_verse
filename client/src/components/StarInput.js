import React from 'react';

const StarInput = ({ handleChange }) => {
  const change = (evt) => {
    handleChange(evt.target.value, evt.target.name);
  };

  return (
    <fieldset className='starability-basic'>
      <input
        type='radio'
        id='no-rate'
        className='input-no-rate'
        name='rating'
        value='1'
        checked
        onChange={change}
        aria-label='No rating.'
      />
      <input
        type='radio'
        id='first-rate1'
        name='rating'
        value='1'
        checked
        onChange={change}
      />
      <label htmlFor='first-rate1' title='Terrible'>
        1 star
      </label>
      <input
        type='radio'
        id='first-rate2'
        name='rating'
        value='2'
        onChange={change}
      />
      <label htmlFor='first-rate2' title='Not good'>
        2 stars
      </label>
      <input
        type='radio'
        id='first-rate3'
        name='rating'
        value='3'
        onChange={change}
      />
      <label htmlFor='first-rate3' title='Average'>
        3 stars
      </label>
      <input
        type='radio'
        id='first-rate4'
        name='rating'
        value='4'
        onChange={change}
      />
      <label htmlFor='first-rate4' title='Very good'>
        4 stars
      </label>
      <input
        type='radio'
        id='first-rate5'
        name='rating'
        value='5'
        onChange={change}
      />
      <label htmlFor='first-rate5' title='Amazing'>
        5 stars
      </label>
    </fieldset>
  );
};

export default StarInput;
