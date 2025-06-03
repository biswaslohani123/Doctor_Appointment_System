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
      <img src={userData.image} alt="" />
      {
        isEdit ? <input type="text" value={userData.name} onChangeCapture={e => setUserData(prev => ({...prev,name: e.target.value}))} />
        : <p>{userData.name}</p>
      }

      <hr />
      <div>
        <p>CONTACT INFORMATION</p>
        <div>
          <p>Email id:</p>
          <p>{userData.email}</p>
          <p>Phone:</p>
           {
        isEdit ? <input type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone: e.target.value}))} />
        : <p>{userData.phone}</p>
      }
      <p>Address:</p>
      {
        isEdit 
        ? <p>
        <input type="text" onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} value={userData.address.line1} />
        <br />
        <input type="text" onChange={(e) => setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} value={userData.address.line2} /></p>
        :
        <p>{userData.address.line1}
        <br />
        <p>{userData.address.line2}</p>
        </p>
      }
        </div>
      </div>
      <p>BASIC INFORMATION</p>
    </div>
  )
}

export default MyProfile
