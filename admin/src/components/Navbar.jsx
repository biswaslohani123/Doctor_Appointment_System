import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'

const Navbar = () => {

    const {atoken,setAToken} = useContext(AdminContext);

    const logout = () => {
        atoken && setAToken('')
        atoken && localStorage.removeItem('atoken')

    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='2-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2 py-0.5 rounded-full border-gray-600 text-gray-600'>{atoken ? 'Admin': 'Doctor'}</p>
      </div>
      <button onClick={logout} className=' text-black bg-blue-50 border text-sm px-10 py-2 rounded-full cursor-pointer hover:bg-blue-400 hover:transition-all  '>Logout</button>
    </div>
  )
}

export default Navbar
