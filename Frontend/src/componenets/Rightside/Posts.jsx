import React from 'react'
import Post from './Post'
import Pagination from './Pagination'
import { usePostContext } from '../../context/PostContext.jsx'

function Posts() {
  const {post}=usePostContext()   
     
  return (
    <div  style={{maxHeight:'calc(90vh)'}} className='overflow-scroll no-scrollbar'>
      {post.map((posst,id)=><Post data={posst} key={id}/>)}
      <Pagination/>
    </div>
  )
}

export default Posts
