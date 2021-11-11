import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { useHistory, Link } from 'react-router-dom';

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
        console.log(response.data);
        setProgram(response.data);
        setProgImages(response.data.images);
        setAuthorName(response.data.author.username);
        setReviews(response.data.reviews);
        const response2 = await axios.get('/api/auth/currentuser');
        setCurrentUser(response2.data);
        console.log(`CurrentUser - ${response2.data}`);
      }
      getResponse();
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  //star rating
  const changeRating = (newRating, name) => {
    setState({
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
    await axios.post(`/api/programs/${id}/reviews`, state);
  };

  const handleDelete = async () => {
    history.push('/programs');

    await axios.delete(`/api/programs/${id}`);
  };

  const handleReviewDelete = async (rid) => {
    const afterDeleteReviews = reviews.filter((review) => review._id !== rid);
    setReviews(afterDeleteReviews);
    await axios.delete(`/api/programs/${id}/reviews/${rid}`);
  };

  //TODO-1: WHY IS PROGRAM.IMAGES[0] UNDEFINED + AUTHOR TOO?
  //TODO-1: HOW TO COMBINE STATE AND REVIEW

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-6'>
          <ProgramCard
            id={program._id}
            title={program.title}
            // image={program.images[0].url}
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
          <div
            id='programCarousel'
            className='carousel slide'
            data-ride='carousel'
          >
            <div className='carousel-inner'>
              {progImages.map((img, i) => {
                return (
                  <div
                    key={i}
                    className={
                      i === 0 ? 'carousel-item active' : 'carousel-item'
                    }
                  >
                    <img
                      className='d-block w-100'
                      src={img.url}
                      alt='First slide'
                    />
                  </div>
                );
              })}
            </div>
            {progImages.length > 1 && (
              <>
                <Link
                  className='carousel-control-prev'
                  to='#programCarousel'
                  role='button'
                  data-slide='prev'
                >
                  <span
                    className='carousel-control-prev-icon'
                    aria-hidden='true'
                  ></span>
                  <span className='sr-only'>Previous</span>
                </Link>
                <Link
                  className='carousel-control-next'
                  to='#campgroundCarousel'
                  role='button'
                  data-slide='next'
                >
                  <span
                    className='carousel-control-next-icon'
                    aria-hidden='true'
                  ></span>
                  <span className='sr-only'>Next</span>
                </Link>
              </>
            )}
          </div>
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
