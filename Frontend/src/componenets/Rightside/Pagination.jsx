import React from 'react'
import { usePostContext } from '../../context/PostContext.jsx'

function Pagination() {
    const {currentpage,setcurrentpage}=usePostContext()
    

    return (
        <div className='flex justify-center items-center'>
            <div className="join mb-2">
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label="1"
                    onClick={()=>setcurrentpage(1)} 
                    defaultChecked />
                <input onClick={()=>setcurrentpage(2)}  className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
                <input  onClick={()=>setcurrentpage(3)}  className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
                <input  onClick={()=>setcurrentpage(4)}  className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
            </div>
        </div>
        
    )
}

export default Pagination
