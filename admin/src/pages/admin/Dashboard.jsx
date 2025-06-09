import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { dashData, getDashData, atoken,cancelAppointments} = useContext(AdminContext);

  useEffect(() => {
      if (atoken) {
        getDashData()
        
      }
  },[atoken])

  return dashData &&  (
    <div>
      <div>
        <div>
          <img src={assets.doctor_icon} alt="" />
          <div>
            <p>{dashData.doctors}</p>
            <p>doctors</p>
          </div>
        </div>
        <div>
          <img src={assets.appointment_icon} alt="" />
          <div>
            <p>{dashData.appointments}</p>
            <p>appointments</p>
          </div>
        </div>
        <div>
          <img src={assets.patients_icon} alt="" />
          <div>
            <p>{dashData.patients}</p>
            <p>patients</p>
          </div>
        </div>
        
      </div>
      <div>
        <div>
          <img src={assets.list_icon} alt="" />
          <p>latest Bookings</p>
        </div>
        <div>
          {
            dashData.latestAppointments.map((item, index) => (
                <div key={index}>
                  <img src={item.docData.image} alt="" />
                  <div>
                    <p>{item.docData.name}</p>
                    <p>{item.slotDate}</p>
                  </div>
                  {
                    item.cancelled? <p>Cancelled</p> : <img onClick={() => cancelAppointments(item._id)} src={assets.cancel_icon} alt="" />
                  }

                </div>
            ))
          }
        </div>
      </div>
     
    </div>
  )
}

export default Dashboard
