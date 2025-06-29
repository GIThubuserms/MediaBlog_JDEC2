import React from 'react'
import chatty from '../../../assets/images.png'
import {Link} from 'react-router-dom'

function TopLeft() {
  return (
    <div className=''>
      <img src={chatty} alt="" className='w-[80px] h-[80px] rounded-[100%]'  /> 
      <button className="btn btn-active mt-5"><Link to={'/upload'}>Upload</Link></button>    
      </div>
  )
}

export default TopLeft
