import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = ({ details }) => {
  const { id } = details.match.params;
  useEffect(() => {
    try {
      async function getResponse() {
        const response = await axios.get(`/api/users/${id}`);
        console.log(response);
      }
      getResponse();
    } catch (e) {
      alert(e);
    }
  }, [id]);

  if (id) {
    return (
      <div>
        <h1>Hiii user with id {details.match.params.id} </h1>
      </div>
    );
  } else {
    return (
      <h1>
        You seem to be logged out due to some server error, Login first to
        create{' '}
      </h1>
    );
  }
};

export default User;
