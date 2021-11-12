import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';

import { useHistory } from 'react-router-dom';

const UserCreateAndUpdate = ({ details, method, handleData }) => {
  const [state, setState] = useState({
    username: '',
    bio: '',
    profilePicture: '',
    gitHubLink: '',
    email: '',
    password: '',
  });
  const { id } = details.match.params;
  let history = useHistory();
  const handleChange = (value, name) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    // if (method === 'create') {
    evt.preventDefault();
    const response = await axios.post('/api/auth/register', state);
    window.localStorage.setItem('userData', JSON.stringify(response.data));
    console.log(response);
    alert('registered');
    history.push('/programs');
    // } else {
    //
    // }
  };

  return (
    <div class='container d-flex justify-content-center align-items-center mt-5 mb-5'>
      <div class='row'>
        <div class='col-md-6  col-xl-12 '>
          <div class='card shadow'>
            <img
              src='https://www.assetinfinity.com/blog/wp-content/uploads/2020/10/Fixed-Asset-Register.jpg'
              alt=''
              class='card-img-top'
            />
            <div class='card-body'>
              <h5 class='card-title'>
                {id ? 'Edit User Details' : 'Create a New User'}
              </h5>
              <form onSubmit={handleSubmit}>
                <FormInput
                  type='text'
                  label='Username'
                  handleChange={handleChange}
                  name='username'
                  value={state.username}
                  className='form-control'
                />
                <FormInput
                  type='text'
                  label='Enter Bio'
                  handleChange={handleChange}
                  name='bio'
                  value={state.bio}
                  className='form-control'
                />
                <FormInput
                  type='text'
                  label='Upload Profile Picture'
                  handleChange={handleChange}
                  name='profilePicture'
                  value={state.profilePicture}
                  className='form-control'
                />
                <FormInput
                  type='text'
                  label='Enter Your Github Link'
                  handleChange={handleChange}
                  name='gitHubLink'
                  value={state.gitHubLink}
                  className='form-control'
                />
                <FormInput
                  type='email'
                  label='Enter Email'
                  handleChange={handleChange}
                  name='email'
                  value={state.email}
                  className='form-control'
                />
                <FormInput
                  type='password'
                  label='Enter Password'
                  handleChange={handleChange}
                  name='password'
                  value={state.password}
                  className='form-control'
                />
                <div className='mb-3'>
                  <input className='btn btn-success' type='submit' />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCreateAndUpdate;
