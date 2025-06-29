import React from 'react'
import Posts from './Posts'
import Pagination from './Pagination.jsx'

function Right() {
  return (
    
    <div className='flex justify-center items-center  w-[97%]'>
      <div  className="bg-slate-900  overflow-hidden  h-screen w-[85%] sm:w-[50%] md:w-[40%] lg:w-[30%]">
     
      <div style={{maxHeight:'calc(8vh)'}}>
      <p className='text-gray-500 text-4xl font-semibold my-3'>Reels</p>
      </div>
      <Posts/>  
      </div>     
    </div>
  )
}

export default Right
