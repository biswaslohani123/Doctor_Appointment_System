import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';

const App = () => {


  const{atoken } = useContext(AdminContext)


  return atoken ?  (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
    </div>
  ): 
  (
    <>
    <Login/>
      <ToastContainer/>
    </>
  )
}

export default App
