import React from 'react';

const Error = ({ error }) => {
  return (
    <div class='alert alert-success' role='alert'>
      <h4 class='alert-heading'>Well done!</h4>
      <p>{error}</p>
      <hr />
      <p class='mb-0'>
        Whenever you need to, be sure to use margin utilities to keep things
        nice and tidy.
      </p>
    </div>
  );
};

export default Error;
