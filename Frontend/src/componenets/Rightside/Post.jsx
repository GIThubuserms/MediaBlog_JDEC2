import React, { useEffect, useState } from 'react'
import { IoHeartOutline } from "react-icons/io5";
import { useLikecontext } from '../../context/LikeContext.jsx';

function Post({ data }) {
    const {fetchlike, fetchTotallike } = useLikecontext()
    const [islike, setislike] = useState('')
    const [likes, setlikes] = useState(0);

    let date=new Date(data.createdAt)
    date=date.toLocaleDateString([],{hour:'2-digit',minute:'2-digit'})
    

    useEffect(()=>{
        async function pp() {
          const res=  await fetchTotallike(data?._id);
          setlikes(res||0)
        }
        pp()
    },[dolike])
       
    async function dolike() {
        const res = await fetchlike(data?._id)
        setislike(res)
    }
 console.log(data);
 
 
    return (
        <div className='mb-5 '>
            <div className="max-w-sm space-y-2 rounded-xl  bg-white border  shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="avatar flex h-16 p-2 space-x-2">
                    <div className="ring-primary ring-offset-base-100 w-14  rounded-full ring ">
                        <img src={data?.owner[0].avatar||data?.owner[0].avatar.avatar} />
                    </div>
                    <div className='w-full ' >
                        <p>{data?.owner[0].username||data?.owner[0].username.username}</p>
                        <p>{date}</p>
                    </div>

                </div>
                <img className="h-[400px] w-full" src={data.pic} alt="" />
                <div className='flex space-x-1 items-center'>
                    <IoHeartOutline onClick={dolike}  size={24} className={` ${islike==="Like successfull"?"text-red-600":"text-black"} font-semibold rounded-3xl`} />
                    <span className='font-semibold text-sm'>{likes||0}</span>
                </div>
                <div>
                    <p className='pl-2 text-sm font-bold  font-sans'>{data.discription}</p>
                </div>
            </div>


        </div>
    )
}

export default Post
