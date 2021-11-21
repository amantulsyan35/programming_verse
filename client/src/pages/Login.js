import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../components/FormInput';
import { useHistory } from 'react-router-dom';

const Login = ({ handleData, handleUser }) => {
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
      const response = await axios.post('/api/auth/login', state);
      window.localStorage.setItem('userData', JSON.stringify(response.data));
      handleData(response.data);
      const response2 = await axios.get('/api/auth/currentuser');
      handleUser(response2.data);

      history.push('/programs');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center mt-5 mb-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-xl-6 '>
          <div className='card shadow'>
            <img
              src='https://media.gcflearnfree.org/content/5e31ca08bc7eff08e4063776_01_29_2020/ProgrammingIllustration.png'
              alt=''
              className='card-img-top'
            />
            <div className='card-body'>
              <h5 className='card-title'>Login</h5>
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
      </div>
    </div>
  );
};

export default Login;
