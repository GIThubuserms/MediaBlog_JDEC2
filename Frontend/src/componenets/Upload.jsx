import axios from 'axios'
import React, { useState } from 'react'
import { usePostContext } from '../context/PostContext.jsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading.jsx'

function Upload() {

  const {post,setposts} = usePostContext()
  const [loading,setisloading]=useState(false)

  const naigate=useNavigate()

  const handlesubmit = async (e) => {
    e.preventDefault()
    const form1= new FormData()
    const form2 = new FormData(e.target)
    form1.append('discription',form2.get('textarea'))
    form1.append('pic',form2.get('pic'))
    console.log(form1);
    
    try {
      setisloading(true)
      const res = await axios.post('https://mediaweb.onrender.com/api/v1/post/upload',form1, { withCredentials: true })
      if (res.data.message) {
        console.log(res.data.message);
        setposts([...post, res.data.message])
        toast.success("Post Created Successfully")
        naigate('/')
        setisloading(false)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message||error.message)
      setisloading(false)
    }

  }
 console.log(post);
 


  return (
    <div className={` w-full h-screen flex justify-center items-center`}>
    {loading && <Loading/>}    
      <form onSubmit={handlesubmit} encType='multipart/form-data' className={` ${loading&&"hidden"} flex flex-col justify-start items-center mx-auto w-[50%] space-y-7`}>

        <div className='text-start flex space-x-3 justify-between items-center'>
          <p className="font-semibold font-sans">Discription</p>
          <textarea name='textarea' className="textarea textarea-bordered  w-[200px]  md:w-[300px] outline-none resize-none" placeholder=""></textarea>
        </div>

        <div className='text-start flex space-x-3 justify-between items-center'>
          <p className=" font-semibold font-sans">Upload Post</p>
          <input name='pic' type="file" className="file-input file-input-bordered w-[200px] md:w-[300px] resize-none" />

        </div>

        <div className='ml-14 '>
          <button type='submit' className={` px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
            <svg className="w-3.5 h-3.5 text-white me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
            Post
          </button>
        </div>

      </form>
    </div>
  )
}

export default Upload
