import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../components/Card';

const ProgramIndex = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    try {
      async function getResponse() {
        const response = await axios.get('/api/programs');
        setPrograms(response.data);
      }
      getResponse();
    } catch (e) {
      alert(e);
    }
  }, []);

  return (
    <div className='container mt-3 '>
      <div
        style={{
          width: '100%',
          height: '200px',
          backgroundImage: `url(${'https://cdnwebsite.databox.com/wp-content/uploads/2018/02/02130334/DesignToolsBG.jpg'})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'none',
        }}
      ></div>
      <h2 className='text-center mt-3'>Program Index</h2>
      <ul className=' container mt-5'>
        {programs.map((p) => {
          return (
            <Card
              key={p._id}
              id={p._id}
              title={p.title}
              image={p.images[0].url}
              description={p.description}
              language={p.language}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default ProgramIndex;
