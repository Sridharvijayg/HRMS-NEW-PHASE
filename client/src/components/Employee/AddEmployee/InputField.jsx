import React from 'react';

const InputField = ({ id, label, type = 'text', register, errors, placeholder, validation }) => {
  return (
    <div className="col col-12 col-md-12 col-lg-6">
      <label htmlFor={id}>{label} <span>*</span></label>
      <input
        type={type}
        id={id}
        {...register(id, validation)}
        placeholder={placeholder}
      />
      {errors[id] && <p className="text-small text-danger">{errors[id].message}</p>}
    </div>
  );
};

export default InputField;
