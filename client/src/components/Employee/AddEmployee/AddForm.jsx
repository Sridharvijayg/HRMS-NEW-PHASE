import React from 'react';
import InputField from './InputField';
import SelectField from './SelectField';

const AddForm = ({ register, errors }) => {
  
  const departmentOptions = [
    { value: 'Design', label: 'Design' },
    { value: 'Development', label: 'Development' },
    { value: 'Testing', label: 'Testing' },
    { value: 'Intern', label: 'Intern' },
  ];

  const designationOptions = [
    { value: 'Software Developer', label: 'Software Developer' },
    { value: 'Software Designer', label: 'Software Designer' },
    { value: 'Tester', label: 'Tester' },
  ];

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' },
  ];


  return (
    <>
      {/* Employee ID Field */}
      <InputField
        id="id"
        label="Employee ID"
        register={register}
        errors={errors}
        placeholder="Enter ID"
        validation={{ required: 'Employee ID is required' }}
      />

      {/* Name Field */}
      <InputField
        id="name"
        label="Name"
        register={register}
        errors={errors}
        placeholder="Enter name"
        validation={{ required: 'Name is required' }}
      />
      
      {/* Name Field */}
      <InputField
        id="email"
        label="email"
        register={register}
        errors={errors}
        type="email"
        placeholder="Enter email"
        validation={{ required: 'Email is required' }}
      />
      
      {/* Dob Field */}
      <InputField
        id="dob"
        label="Date of Birth"
        type="date"
        register={register}
        errors={errors}
        placeholder="Enter email"
        validation={{ required: 'Email is required' }}
      />
      
      {/* Designation Field */}
      <SelectField
        id="position"
        label="Designation"
        register={register}
        errors={errors}
        options={designationOptions}
        validation={{ required: 'Designation is required' }}
      />

      {/* Department Field */}
      <SelectField
        id="department"
        label="Department"
        register={register}
        errors={errors}
        options={departmentOptions}
        validation={{ required: 'Department is required' }}
      />

      {/* Project Field */}
      <SelectField
        id="gender"
        label="Gender"
        register={register}
        errors={errors}
        options={genderOptions}
        validation={{ required: 'Gender is required' }}
      />

      {/* Contact Field */}
      <InputField
      id="contact"
      label="Contact"
      register={register}
      errors={errors}
      placeholder="Enter Contact"
      validation={{ required: 'Contact is required' }}
      />

      {/* Address Field */}
      <InputField
        id="address"
        label="Address"
        register={register}
        errors={errors}
        placeholder="Enter Address"
        validation={{ required: 'Address is required' }}
      />

    </>
  );
};

export default AddForm;
