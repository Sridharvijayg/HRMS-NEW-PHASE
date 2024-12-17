import React from 'react'

const DetailView = ({label,data}) => {
  return (
    <div className='col col-12 col-md-12 col-lg-6 cols'>
      <p className="label">{label}</p>
      <p className="data">{data}</p>
    </div>
  )
}

export default DetailView
