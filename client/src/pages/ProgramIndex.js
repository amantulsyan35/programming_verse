import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../components/Card';

const ProgramIndex = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    async function getResponse() {
      const response = await axios.get('/api/programs');

      setPrograms(response.data);
    }
    getResponse();
  }, []);

  return (
    <div className='container mt-5'>
      <h1 className='text-center'>Program Index</h1>
      <ul className='mt-5'>
        {programs.map((p) => {
          return (
            <Card
              key={p._id}
              id={p._id}
              title={p.title}
              // image={p.images[0].url}
              image='https://media.gcflearnfree.org/content/5e31ca08bc7eff08e4063776_01_29_2020/ProgrammingIllustration.png'
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
