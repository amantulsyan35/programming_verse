import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormInput from './FormInput';
import Editor from './Editor';
import { useHistory } from 'react-router';

// import Error from './Error';

const Form = ({ method, id }) => {
  const [state, setState] = useState({
    title: '',
    images: [
      {
        url: '',
        original_filename: '',
      },
    ],
    description: '',
    code: '',
    linesOfCode: '',
  });
  const [user, setUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  let history = useHistory();

  useEffect(() => {
    try {
      async function getResponse() {
        if (id) {
          const response = await axios.get(`/api/programs/${id}`);
          setState(response.data);
        }
        const response2 = await axios.get('/api/auth/currentuser');
        setUser(response2.data);
      }
      getResponse();
    } catch (e) {
      alert(e);
    }
  }, [id]);

  const createImages = async (method) => {
    const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dkrdwicst/image/upload';

    const formData = new FormData();
    const workers = Array.from(selectedImage).map(async (file) => {
      formData.append('file', file);
      formData.append('upload_preset', 'wk36xs0c');

      return axios.post(UPLOAD_URL, formData);
    });

    Promise.all(workers)
      .then(async (responseList) => {
        const images = responseList.map((response) => {
          const { url, original_filename, public_id } = response.data;
          return { url, original_filename, public_id };
        });

        const { title, description, code, linesOfCode } = state;
        const data = {
          title,
          images,
          description,
          code,
          linesOfCode,
        };

        alert('posted successfully');
        await axios.post('/api/programs', data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const editImages = async (method) => {
    const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dkrdwicst/image/upload';

    const formData = new FormData();
    const workers = Array.from(selectedImage).map(async (file) => {
      formData.append('file', file);
      formData.append('upload_preset', 'wk36xs0c');

      return axios.post(UPLOAD_URL, formData);
    });

    Promise.all(workers)
      .then(async (responseList) => {
        const images = responseList.map((response) => {
          const { url, original_filename, public_id } = response.data;
          return { url, original_filename, public_id };
        });

        const { title, description, code, linesOfCode } = state;
        const data = {
          title,
          images,
          description,
          code,
          linesOfCode,
        };

        alert('edited successfully');
        await axios.put(`/api/programs/${id}/edit`, data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleSubmit = async (evt) => {
    try {
      if (method === 'create') {
        evt.preventDefault();
        await createImages();
        alert('please wait it may take sometime');
        setTimeout(() => {
          history.push('/programs');
        }, 5000);
      } else {
        await editImages();
        history.push(`/programs`);
        alert('please wait it may take sometime');
      }
    } catch (e) {
      alert(e);
    }
  };

  const onUploadImage = async (evt) => {
    console.log(evt.target.files);
    setSelectedImage(evt.target.files);
  };

  const handleChange = (value, name) => {
    setState({
      ...state,
      [name]: value,
    });
  };
  if (user) {
    return (
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          label='title'
          handleChange={handleChange}
          name='title'
          value={state.title}
          className='form-control'
        />
        <div className='mb-3'>
          <label className='form-label'>Image</label>
          <input
            type='file'
            onChange={onUploadImage}
            name='image'
            className='form-control'
            multiple
          />
        </div>
        <FormInput
          type='textarea'
          label='description'
          handleChange={handleChange}
          name='description'
          value={state.description}
          className='form-control'
        />
        <Editor
          language='javascript'
          value={state.code}
          handleChange={handleChange}
          name='code'
          readOnly={false}
        />

        <FormInput
          type='number'
          label='Lines Of Code'
          handleChange={handleChange}
          name='linesOfCode'
          value={state.linesOfCode}
          className='form-control'
        />

        <div className='mb-3'>
          <input className='btn btn-success ' type='submit' />
        </div>
      </form>
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

export default Form;
