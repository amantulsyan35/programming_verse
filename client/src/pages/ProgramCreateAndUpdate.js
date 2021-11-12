import React from 'react';
import Form from '../components/ProgramsForm';

const ProgramCreateAndUpdate = ({ details }) => {
  const { id } = details.match.params;

  //TODO: CHANGE THE NAME OF THE FORM OR COMBINE IN ONE FILE

  return (
    <div className='container d-flex justify-content-center align-items-center mt-5 mb-5'>
      <div className='row'>
        <div className='col-md-6  col-xl-12 '>
          <div className='card shadow'>
            <img
              src='https://marketsplash.com/content/images/2021/03/Best-illustration-tools.png'
              alt=''
              className='card-img-top'
            />
            <div className='card-body'>
              <h5 className='card-title'>
                {id ? 'Edit Program' : 'Create Program'}
              </h5>
              <Form method={id ? 'edit' : 'create'} id={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCreateAndUpdate;
