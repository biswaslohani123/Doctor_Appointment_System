import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Appointments = () => {
  const { atoken, getAllAppointments, appointments, cancelAppointments } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (atoken) {
      getAllAppointments()
    }
  }, [atoken])

  return (
    <div className='w-full max-w-6xl mx-auto my-6 px-4'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-4'>All Appointments</h2>
      <div className='bg-white border rounded-lg shadow-sm overflow-y-scroll max-h-[65vh]'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] px-6 py-4 bg-gray-100 font-semibold text-gray-700 text-sm'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] items-center px-4 py-4 border-b hover:bg-gray-50 text-sm text-gray-700 gap-3 sm:gap-0'
          >
            <p>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <img
                src={item.userData.image}
                alt='Patient'
                className='w-8 h-8 rounded-full object-cover'
              />
              <p className='font-medium'>{item.userData.name}</p>
            </div>

            <p>{calculateAge(item.userData.dob)}</p>

            <p className='text-gray-600'>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <div className='flex items-center gap-2'>
              <img
                src={item.docData.image}
                alt='Doctor'
                className='w-8 h-8 rounded-full object-cover'
              />
              <p className='font-medium'>{item.docData.name}</p>
            </div>

            <p className='text-green-600 font-semibold'>
              {currency}
              {item.docData.fees}
            </p>

            {item.cancelled ? (
              <span className='text-red-500 font-medium'>Cancelled</span>
            ) : (
              <button
                onClick={() => cancelAppointments(item._id)}
                className='text-red-600 hover:text-red-800 font-medium transition duration-200'
                title='Cancel Appointment'
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Appointments
