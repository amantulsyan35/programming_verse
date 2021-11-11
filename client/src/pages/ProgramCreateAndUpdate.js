import React from 'react';
import Form from '../components/Form';

const ProgramCreateAndUpdate = ({ details }) => {
  const { id } = details.match.params;

  //TODO: CHANGE THE NAME OF THE FORM OR COMBINE IN ONE FILE

  return (
    <div className='  mt-5 row'>
      <h1 className='text-center'>{id ? 'Edit Program' : 'Create Program'}</h1>
      <div className='col-6 offset-3'>
        <Form method={id ? 'edit' : 'create'} id={id} />
      </div>
    </div>
  );
};

export default ProgramCreateAndUpdate;
