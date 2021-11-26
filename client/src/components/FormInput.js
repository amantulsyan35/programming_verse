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
  placeholder,
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
          placeholder={placeholder}
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
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
