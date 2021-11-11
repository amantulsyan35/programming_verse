import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';
import { useHistory } from 'react-router-dom';

const Login = ({ handleData }) => {
  let history = useHistory();
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const handleChange = (value, name) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      console.log(state);
      const response = await axios.post('/api/auth/login', state);
      window.localStorage.setItem('userData', JSON.stringify(response.data));
      console.log(response);
      history.push('/programs');
      alert('logged in');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='  mt-5 row'>
      <h1 className='text-center'>Login</h1>
      <div className='col-6 offset-3'>
        <div className='container'>
          <form onSubmit={handleSubmit}>
            <FormInput
              type='text'
              label='Enter Username'
              handleChange={handleChange}
              name='username'
              value={state.username}
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
  );
};

export default Login;
