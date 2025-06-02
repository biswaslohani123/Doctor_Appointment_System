"use client"

import { useEffect, useState } from "react"
import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])

  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const specialties = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ]

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <p className="text-gray-600 mb-8 text-lg">Browse through the doctors specialist.</p>

      <div className="flex gap-8">
        {/* Specialty Filter Sidebar */}
        <div className="flex flex-col gap-3 min-w-[250px]">
          {specialties.map((spec, index) => (
            <div
              key={index}
              onClick={() => navigate(`/doctors/${spec}`)}
              className={`px-4 py-3 border border-gray-300 rounded cursor-pointer transition-colors ${
                speciality === spec ? "bg-blue-50 border-blue-300 text-blue-700" : "bg-white hover:bg-gray-50"
              }`}
            >
              {spec}
            </div>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-6">
            {filterDoc.map((doctor, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow bg-white"
              >
                {/* Doctor Image */}
                <div className="bg-blue-50 h-64 flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover"
                    src={doctor.image || "/placeholder.svg?height=256&width=200"}
                    alt={doctor.name}
                  />
                </div>

                {/* Doctor Info */}
                <div className="p-4">
                  {/* Available Status */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 text-sm font-medium">Available</span>
                  </div>

                  {/* Doctor Name */}
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Dr. {doctor.name}</h3>

                  {/* Specialty */}
                  <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors
