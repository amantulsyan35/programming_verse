import React from 'react';

const Input = ({
  label,
  type,
  name,
  handleChange,
  value,
  rows,
  cols,
  min,
  max,
  className,
}) => {
  const change = (evt) => {
    handleChange(evt.target.value, evt.target.name);
  };

  return (
    <div className='mb-3'>
      <label className='form-label'>{label}</label>
      {type === 'textarea' ? (
        <textarea
          className={className}
          type={type}
          value={value}
          name={name}
          onChange={change}
          rows={rows}
          cols={cols}
          required
        />
      ) : (
        <input
          className={className}
          type={type}
          value={value}
          name={name}
          onChange={change}
          min={min}
          max={max}
          required
        />
      )}
    </div>
  );
};

export default Input;
