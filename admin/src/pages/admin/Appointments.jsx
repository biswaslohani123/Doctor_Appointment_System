

import { useContext, useEffect } from "react"
import { AdminContext } from "../../context/AdminContext"
import { AppContext } from "../../context/AppContext"
import { Calendar, Clock, User, DollarSign, X, CheckCircle } from "lucide-react"

const Appointments = () => {
  const { atoken, getAllAppointments, appointments, cancelAppointments } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (atoken) {
      getAllAppointments()
    }
  }, [atoken])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Appointments</h1>
          <p className="mt-2 text-gray-600">Manage and track all patient appointments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {appointments.filter((apt) => !apt.cancelled).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.filter((apt) => apt.cancelled).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden lg:grid lg:grid-cols-7 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">#</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Age</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Doctor</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fees</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</div>
          </div>

          {/* Appointments List */}
          <div className="divide-y divide-gray-200">
            {appointments.map((item, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                {/* Desktop Layout */}
                <div className="hidden lg:grid lg:grid-cols-7 gap-4 items-center">
                  <div className="text-sm font-medium text-gray-900">#{String(index + 1).padStart(3, "0")}</div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        src={item.userData.image || "/placeholder.svg"}
                        alt={item.userData.name}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.userData.name}</p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">{calculateAge(item.userData.dob)} years</div>

                  <div className="text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{slotDateFormat(item.slotDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="h-4 w-4" />
                      <span>{item.slotTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        src={item.docData.image || "/placeholder.svg"}
                        alt={item.docData.name}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.docData.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                   
                    <span className="text-sm font-semibold text-green-600">
                      {currency}
                      {item.docData.fees}
                    </span>
                  </div>

                  <div>
                    {item.cancelled ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <X className="h-3 w-3 mr-1" />
                        Cancelled
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointments(item._id)}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors duration-200 border border-red-200"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.userData.image || "/placeholder.svg"}
                        alt={item.userData.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-200"
                      />
                      <div>
                        <p className="text-base font-medium text-gray-900">{item.userData.name}</p>
                        <p className="text-sm text-gray-500">{calculateAge(item.userData.dob)} years old</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">#{String(index + 1).padStart(3, "0")}</p>
                      {item.cancelled ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                          <X className="h-3 w-3 mr-1" />
                          Cancelled
                        </span>
                      ) : (
                        <button
                          onClick={() => cancelAppointments(item._id)}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors duration-200 border border-red-200 mt-1"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-xs font-medium text-gray-500 uppercase">Date & Time</span>
                      </div>
                      <p className="text-sm text-gray-900">{slotDateFormat(item.slotDate)}</p>
                      <p className="text-sm text-gray-600">{item.slotTime}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        
                        <span className="text-xs font-medium text-gray-500 uppercase">Fees</span>
                      </div>
                      <p className="text-sm font-semibold text-green-600">
                        {currency}
                        {item.docData.fees}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-xs font-medium text-gray-500 uppercase">Doctor</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.docData.image || "/placeholder.svg"}
                        alt={item.docData.name}
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                      />
                      <p className="text-sm font-medium text-gray-900">{item.docData.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {appointments.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
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
