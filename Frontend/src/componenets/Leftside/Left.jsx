import React, { useState } from 'react'
import TopLeft from './TopLeft/TopLeft'
import Bottomleft from './BottomLeft/Bottomleft'
import { GiHamburgerMenu } from "react-icons/gi";

function Left() {
    return (
        <div className='w-[12%] z-10 sm:w-[7%] md:w-[6%] lg:w-[5%] '>
          <div className="drawer">
                 <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                 <div className="drawer-content w-10 mt-3 flex justify-center items-center">
                     {/* Page content here */}
                     <label htmlFor="my-drawer" className="">
                         <GiHamburgerMenu size={24} />
                     </label>
                 </div>
                 <div className="drawer-side">
                     <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                     <ul className="menu bg-base-200 text-base-content min-h-full w-29 p-4 flex justify-between items-start">
                         {/* Sidebar content here */}
                         <TopLeft />
                         <Bottomleft />
                     </ul>
                 </div>
             </div>
             </div> 
    )
}

export default Left
