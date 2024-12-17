import React from 'react';

const SelectField = ({ id, label, register, errors, options, validation }) => {
  return (
    <div className="col col-12 col-md-12 col-lg-6">
      <label htmlFor={id}>{label} <span>*</span></label>
      <select
        id={id}
        {...register(id, validation)}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      {errors[id] && <p className='text-small text-danger'>{errors[id].message}</p>}
    </div>
  );
};

export default SelectField;
