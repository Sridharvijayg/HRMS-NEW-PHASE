import React from 'react';
import profile from '../../../assets/image/profile.jpg';

const Camera = ({ preview }) => {

  return (
    <div className="col col-12 col-md-12 col-lg-12">
      <div className="img-cont">
          <img src={preview? preview : profile} alt="Preview" style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  );
};

export default Camera;
