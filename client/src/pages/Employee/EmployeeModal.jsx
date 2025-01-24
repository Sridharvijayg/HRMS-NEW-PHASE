import React from 'react';

const EmployeeModal = ({ isOpen, onClose, onChange, onSubmit, data }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: 'white',
          width: '40%',
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h5 style={{ margin: 0, fontSize: '16px' }}>{data ? 'Edit Employee' : 'Add Employee'}</h5>
          <button
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
            }}
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <form onSubmit={onSubmit}>
          {[
            { label: 'Select Role', name: 'role' },
            { label: 'Select Team', name: 'team' },
            { label: 'Position', name: 'position' },
            { label: 'Employee ID', name: 'employeeId' },
            { label: 'First Name', name: 'firstName' },
            { label: 'Last Name', name: 'lastName' },
            { label: 'Email ID', name: 'emailId' },
            { label: 'Mobile No', name: 'mobileNo' },
            { label: 'Join Date', name: 'joinDate' },
          ].map((field, index) => (
            <div key={index} style={{ marginBottom: '6px', display: 'flex', alignItems: 'center' }}>
              <label htmlFor={field.name} style={{ width: '40%', textAlign: 'left', fontSize: '12px', paddingRight: '10px' }}>
                {field.label}
              </label>
              <input
                type="text"
                id={field.name}
                name={field.name}
                value={data ? data[field.name] : ''}
                onChange={onChange}
                style={{
                  width: '60%',
                  padding: '4px',
                  fontSize: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                }}
              />
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
            <button
              type="button"
              style={{
                padding: '6px 12px',
                border: 'none',
                borderRadius: '4px',
                background: '#ccc',
                cursor: 'pointer',
                marginRight: '10px',
                fontSize: '12px',
              }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '6px 12px',
                border: 'none',
                borderRadius: '4px',
                background: '#28a745',
                color: 'white',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
