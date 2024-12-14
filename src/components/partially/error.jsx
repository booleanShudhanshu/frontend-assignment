import React from 'react'

const Error = ({error="Something went wrong"}) => {
  
  return (
    <div className='container'>
      <div className="box">
        <p className='error'> {error}</p>
      </div>
    </div>
  )
}

export default Error
