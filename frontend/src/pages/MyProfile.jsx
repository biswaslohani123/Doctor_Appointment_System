import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
   
  const [userData, setUserData] = useState({
    name: "biswas",
    image: assets.profile_pic,
    email: "lohanibiswas2@gmail.com",
    phone: '9814136254',
    address:{
      line1:"vyas 2",
      line2:"pokhara"
    },
    gender: 'Male',
    dob: '2004-01-20'
  })

  const [isEdit, setIsEdit] = useState(false)

  return (
   <div>

    <img src={assets.profile_pic} alt="" />
    {
      isEdit ? <input type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev, name:e.target.value}))} />: <p>{userData.name}</p>
    }


   </div>
  )
}

export default MyProfile
