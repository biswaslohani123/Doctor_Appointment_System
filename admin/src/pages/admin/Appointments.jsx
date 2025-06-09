import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const Appointments = () => {
  const { atoken, getAllAppointments, appointments } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (atoken) {
      getAllAppointments()
    }
  }, [atoken])

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Appointments</h2>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr_1fr] bg-gray-50 py-4 px-6 border-b border-gray-200 text-sm font-medium text-gray-600">
          <p className="text-gray-500">#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status</p>
        </div>

        {/* Table Body - Scrollable */}
        <div className="max-h-[60vh] overflow-y-auto">
          {appointments.map((item, index) => (
            <div 
              key={index}
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr_1fr] items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
            >
              {/* Index Number */}
              <p className="font-medium text-gray-500">{index + 1}</p>
              
              {/* Patient Info */}
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <img 
                    src={item.userData.image || "/placeholder.svg"} 
                    alt={item.userData.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="font-medium text-gray-800">{item.userData.name}</p>
              </div>
              
              {/* Age */}
              <p className="text-gray-600">{calculateAge(item.userData.dob)} yrs</p>
              
              {/* Date & Time */}
              <div>
                <p className="text-gray-800 font-medium">{slotDateFormat(item.slotDate)}</p>
                <p className="text-gray-500 text-sm">{item.slotTime}</p>
              </div>
              
              {/* Doctor Info */}
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                  <img 
                    src={item.docData.image || "/placeholder.svg"} 
                    alt={item.docData.name}
                    className="h-full w-full object-cover" 
                  />
                </div>
                <p className="font-medium text-gray-800">{item.docData.name}</p>
              </div>
              
              {/* Fees */}
              <p className="font-medium text-gray-800">{currency}{item.docData.fees}</p>
              
              {/* Status */}
              {item.cancelled ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Cancelled
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              )}
            </div>
          ))}
          
          {/* Empty State */}
          {appointments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
              <p className="mt-1 text-sm text-gray-500">No appointments have been scheduled yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointments
