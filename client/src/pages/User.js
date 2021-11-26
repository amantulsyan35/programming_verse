import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Profile from '../components/Profile';
import FormInput from '../components/FormInput';
import { Link, useHistory } from 'react-router-dom';

const User = ({ details }) => {
  const { id } = details.match.params;
  let history = useHistory();
  const [user, setuser] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      async function getResponse() {
        const response = await axios.get(`/api/users/${id}`);
        setuser(response.data);
        const response2 = await axios.get('/api/auth/currentuser');
        setCurrentUser(response2.data);
      }
      getResponse();
    } catch (e) {
      alert(e);
    }
  }, [id]);

  const deleteUser = () => {
    history.push('/');
    axios.delete(`/api/users/${id}`).then((res) => {
      console.log(res);
    });
    window.sessionStorage.clear();
    alert('User deleted');
  };

  return (
    <div className='container d-flex justify-content-center align-items-center mt-5 mb-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 col-xl-6 '>
          <div className='card shadow'>
            <img src={user.profilePicture} alt='' className='card-img-top' />

            <div className='card-body'>
              {currentUser ? (
                <>
                  <FormInput
                    type='email'
                    placeholder={user && user.email}
                    className='form-control'
                  />
                  <FormInput
                    type='textarea'
                    placeholder={user && user.bio}
                    className='form-control'
                  />
                  <FormInput
                    type='text'
                    placeholder={user && user.gitHubLink}
                    className='form-control'
                  />
                  {user.programs &&
                    user.programs.map((p) => {
                      return (
                        <Profile
                          key={p._id}
                          title={p.title}
                          description={p.description}
                          id={p._id}
                        />
                      );
                    })}
                  <div className='mb-3 mr-3'>
                    <Link
                      className='btn btn-outline-primary'
                      to={`/auth/edit/${user._id}`}
                    >
                      Edit User
                    </Link>
                    &emsp;
                    <button
                      onClick={deleteUser}
                      className='btn btn-outline-danger'
                    >
                      Delete User
                    </button>
                  </div>
                </>
              ) : (
                <h1>
                  You seem to be logged out due to some server error, Login
                  first to create
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
