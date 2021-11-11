import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormInput from './FormInput';
import Editor from './Editor';
import { useHistory } from 'react-router';

const Form = ({ method, id }) => {
  const [state, setState] = useState({
    title: '',
    images: [
      {
        url: '',
        fileName: '',
      },
    ],
    description: '',
    code: '',
    linesOfCode: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  // const [d, setD] = useState({});
  let history = useHistory();

  useEffect(() => {
    // async function getResponse() {
    //   if (id) {
    //     const response = await axios.get(`/api/programs/${id}`);
    //     setState(response.data);
    //   }
    // }
    // getResponse();
  }, [id]);

  /**
   * A function to handle async images upload
   * Keep in mind that it can be shortened
   * But I like explicit declaration so bare with me
   */
  const createImages = async () => {
    // Please declare your URL`s and API`s as constants at least
    // noone likes to look for a typo in the url
    // Just declare and reuse them
    const UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dkrdwicst/image/upload';
    // Declare the list of Promises
    // const workers = [];
    // Then go through the array of objects you want to upload
    const formData = new FormData();
    const workers = Array.from(selectedImage).map(async (file) => {
      formData.append('file', file);
      formData.append('upload_preset', 'wk36xs0c');
      // Every time we do async call, we push that call to array
      return axios.post(UPLOAD_URL, formData);
    })
    // After we went through the upload array, we need to react on the response
    Promise.all(workers).then(async (responseList) => {
      const images = responseList.map(response => {
        // Also here is the thing called "destructuring"
        // Only works if the names are the same
        const { url, fileName } = response.data;
        return { url, fileName };
      })
      // At this point we have all images in our array
      // So we can compose the data object to send a request
      const { title, description, code, linesOfCode } = state;
      const data = {
        title,
        images,
        description,
        code,
        linesOfCode,
      }
      // And the final request =)
      const response2 = await axios.post('/api/programs', data);
      console.log(response2);
    }).catch(error => {
      // Don't forget about the error handling
      // Promise await will stop as soon as any of the calls in workers array fails 
      console.error(error)
    })
  }
  
  // let selectedImages = [];
  const handleSubmit = async (evt) => {
    try {
      if (method === 'create') {
        evt.preventDefault();
        history.push('/programs');
        await createImages();
        // const formData = new FormData();

        // Array.from(selectedImage).map(async (file) => {
        //   formData.append('file', file);
        //   formData.append('upload_preset', 'wk36xs0c');
        //   const response = await axios.post(
        //     'https://api.cloudinary.com/v1_1/dkrdwicst/image/upload',
        //     formData
        //   );

        //   let imgData = {
        //     url: response.data.url,
        //     fileName: response.data.original_filename,
        //   };
        //   selectedImages.push(imgData);
        // });

        // // TODO: WHY IS THE STATE NOT UPDATING DIRECTLY
        // let data = await {
        //   title: state.title,
        //   images: selectedImages,
        //   description: state.description,
        //   code: state.code,
        //   linesOfCode: state.linesOfCode,
        // };

        // console.log(data);
        // console.log(selectedImages);
        // console.log(state);

        // const response2 = await axios.post('/api/programs', data);
        // console.log(response2);
      } else {
        history.push(`/programs/${id}`);
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', 'wk36xs0c');
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dkrdwicst/image/upload',
          formData
        );
        let data = {
          title: state.title,
          description: state.description,
          code: state.code,
          linesOfCode: state.linesOfCode,
          images: [
            {
              url: response.data.url,
              fileName: response.data.original_filename,
            },
          ],
        };
        await axios.put(`/api/programs/${id}/edit`, data);
      }
    } catch (e) {
      console.log(e);
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

  return (
    <div className='container'>
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
          <input className='btn btn-success' type='submit' />
        </div>
      </form>
    </div>
  );
};

export default Form;
