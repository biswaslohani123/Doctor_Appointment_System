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
    <div>
      
    </div>
  )
}

export default Appointments
