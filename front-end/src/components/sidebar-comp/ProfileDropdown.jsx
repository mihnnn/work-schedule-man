import React , { useState } from 'react'
import avatar from "../../assets/images/avatar.jpg";
import { FaChevronDown } from "react-icons/fa";

function ProfileDropdown() {
    const [click, setClick] = useState(false);
 
    const handleClick = () => setClick(!click);
    return (
    <div className=''>
        {/* profile pic, with drop down menu when clicked */}
        <div className="relative dropdown dropdown-end w-[100%]">
            <div tabIndex={0} role="button" className="flex items-center mt-auto cursor-pointer hover:bg-gray-400 hover:bg-opacity-30 rounded-xl p-2" onClick={handleClick}>
                <div className='btn btn-ghost btn-circle avatar ring flex-shrink-0'>
                    <div className="w-10 h-10 rounded-full">
                        <img alt="Kita Avatar" src={avatar} />
                    </div>
                </div>
                <span className="ml-3 text-lg font-bold flex justify-start items-center h-10">Kita</span>
                <FaChevronDown className="ml-auto" />
            </div>
            {click && (
                <ul
                tabIndex={0}
                className="absolute mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 left-0"
                >
                <li>
                    <a>Profile</a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
                </ul>
            )}
            {/* <span className="ml-2 text-lg font-bold">Kita</span> */}

        </div>

    </div>
    // <div className='relative flex items-center'>
    //     <a className='avatar flex-0 btn btn-ghost gap-1 px-2 md:gap-2'>
    //         <img className = "avatar" src={avatar} alt=" Kita avatar" />
    //         <span className="font-title  text-base-content text-lg md:text-2xl">Kita</span>
    //     </a>
    // </div>
  )
}

export default ProfileDropdown
