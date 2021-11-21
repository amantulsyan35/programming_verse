import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

import ProgramCard from '../components/ProgramCard';
import FormInput from '../components/FormInput';
import '../styles/stars.css';

const Program = ({ details }) => {
  const [program, setProgram] = useState({});
  const [progImages, setProgImages] = useState([]);
  const [authorName, setAuthorName] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState({
    body: '',
    rating: 3,
    // reviews: [{ body: '', rating: 3 }],
  });
  const { id } = details.match.params;
  let history = useHistory();

  useEffect(() => {
    try {
      async function getResponse() {
        const response = await axios.get(`/api/programs/${id}`);
        setProgram(response.data);
        setProgImages(response.data.images);
        setAuthorName(response.data.author.username);
        // console.log(response.data.reviews);
        setReviews(response.data.reviews);
        const response2 = await axios.get('/api/auth/currentuser');
        // console.log(response2.data);
        setCurrentUser(response2.data);
      }
      getResponse();
    } catch (e) {
      alert(e);
    }
  }, [id]);

  //star rating
  const changeRating = (newRating, name) => {
    setState({
      ...state,
      rating: newRating,
    });
  };

  const handleChange = (value, name) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (evt) => {
    try {
      await axios.post(`/api/programs/${id}/reviews`, state);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      history.push('/programs');
      await axios.delete(`/api/programs/${id}`);
    } catch (e) {
      alert(e);
    }
  };

  const handleReviewDelete = async (rid) => {
    try {
      const afterDeleteReviews = reviews.filter((review) => review._id !== rid);
      setReviews(afterDeleteReviews);
      await axios.delete(`/api/programs/${id}/reviews/${rid}`);
    } catch (e) {
      alert(e);
    }
  };

  //TODO-1: WHY IS PROGRAM.IMAGES[0] UNDEFINED + AUTHOR TOO?
  //TODO-1: HOW TO COMBINE STATE AND REVIEW

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-6 '>
          <ProgramCard
            id={program._id}
            title={program.title}
            description={program.description}
            language='javascript'
            code={program.code}
            handleDelete={handleDelete}
            linesOfCode={program.linesOfCode}
            createdAt={program.createdAt}
            author={program.author}
            userName={authorName}
            currentUser={currentUser}
          />
        </div>

        <div className='col-6'>
          <Carousel className='mb-4'>
            {progImages.map((img, i) => {
              return (
                <Carousel.Item key={i}>
                  <img className='d-block w-100' src={img.url} alt='Slide' />
                </Carousel.Item>
              );
            })}
          </Carousel>
          {currentUser && (
            <>
              <h2>Leave a Review</h2>
              <form onSubmit={handleSubmit}>
                <StarRatings
                  rating={state.rating}
                  starRatedColor='#F5BD23'
                  changeRating={changeRating}
                  starDimension='35px'
                  starSpacing='10px'
                  numberOfStars={5}
                  name='rating'
                />
                <FormInput
                  type='textarea'
                  label='Review'
                  handleChange={handleChange}
                  col={30}
                  rows={3}
                  className='form-control'
                  name='body'
                />
                <div className='mb-3'>
                  <input className='btn btn-success' type='submit' />
                </div>
              </form>
            </>
          )}

          {reviews.map((r, idx) => {
            return (
              <div className='card mb-4 ' key={idx}>
                <div className='card-body'>
                  <h5 className='card-title'> {r.author.username}</h5>
                  <StarRatings
                    rating={r.rating}
                    starRatedColor='#F5BD23'
                    starDimension='30px'
                    starSpacing='5px'
                  />
                  <p className='card-text'> {r.body}</p>
                  {currentUser && r.author._id === currentUser._id && (
                    <button
                      onClick={() => handleReviewDelete(r._id)}
                      className='btn btn-sm btn-danger'
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Program;
