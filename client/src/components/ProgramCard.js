import React from 'react';
import { Link } from 'react-router-dom';
import Editor from './Editor';

const ProgramCard = ({
  id,
  title,
  description,
  language,
  handleDelete,
  linesOfCode,
  code,
  createdAt,
  author,
  currentUser,
  userName,
}) => {
  const Delete = () => {
    handleDelete();
  };
  return (
    <div>
      <div className='card mb-3'>
        <Editor readOnly={true} value={code} />
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{description}</p>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item text-muted'>
            {language.toUpperCase()}
          </li>
          <li className='list-group-item text-muted'>
            {linesOfCode} Lines of Code
          </li>
          <li className='list-group-item text-muted'>AUTHOR: {userName}</li>
        </ul>
        {currentUser && author._id === currentUser._id && (
          <div className='card-body'>
            <Link
              className='card-link btn btn-info'
              to={`/programs/edit/${id}`}
            >
              Edit
            </Link>
            <button className=' d-inline btn btn-danger' onClick={Delete}>
              Delete
            </button>
          </div>
        )}
        <div className='card-footer text-muted'>{createdAt}</div>
      </div>
    </div>
  );
};
export default ProgramCard;
