import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const Appointments = () => {

  const {atoken,   getAllAppointments, appointments} = useContext(AdminContext)

  useEffect(() => {
      if (atoken) {
        getAllAppointments()
        
      }
  },[atoken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border border-amber-100 rounded text-sm max-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 bottom-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time </p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]items-center text-gray-500 px-3 py-6 border-b hover:bg-gray-50' key={index}>
              <p>{index + 1}</p>
              <div>
                <img src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Appointments
