"use client"

import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"
import { assets } from "../../assets/assets"
import { Calendar, X } from "lucide-react"

const Dashboard = () => {
  const { dashData, getDashData, atoken, cancelAppointments } = useContext(AdminContext)

  useEffect(() => {
    if (atoken) {
      getDashData()
    }
  }, [atoken])

  return (
    dashData && (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Overview of your medical practice</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Doctors Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <img src={assets.doctor_icon || "/placeholder.svg"} alt="Doctors" className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-bold text-gray-900">{dashData.doctors}</p>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Doctors</p>
                </div>
              </div>
            </div>

            {/* Appointments Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <img src={assets.appointment_icon || "/placeholder.svg"} alt="Appointments" className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-bold text-gray-900">{dashData.appointments}</p>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Appointments</p>
                </div>
              </div>
            </div>

            {/* Patients Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <img src={assets.patients_icon || "/placeholder.svg"} alt="Patients" className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-bold text-gray-900">{dashData.patients}</p>
                  <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Patients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Bookings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <img src={assets.list_icon || "/placeholder.svg"} alt="List" className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Latest Bookings</h2>
            </div>

            {/* Bookings List */}
            <div className="divide-y divide-gray-200">
              {dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Doctor Info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.docData.image || "/placeholder.svg"}
                      alt={item.docData.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-200"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.docData.name}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{item.slotDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status/Action */}
                  <div>
                    {item.cancelled ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <X className="h-3 w-3 mr-1" />
                        Cancelled
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointments(item._id)}
                        className="inline-flex items-center p-2 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                        title="Cancel Appointment"
                      >
                        <img src={assets.cancel_icon || "/placeholder.svg"} alt="Cancel" className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {dashData.latestAppointments.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No recent bookings</h3>
                  <p className="mt-1 text-sm text-gray-500">No appointments have been scheduled recently.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Dashboard
