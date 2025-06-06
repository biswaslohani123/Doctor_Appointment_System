import { useContext, useState } from "react"
import { AdminContext } from "../context/AdminContext"
import axios from 'axios'
import { toast } from "react-toastify"

const Login = () => {
  const [state, setState] = useState("Admin")
  const {setAToken, backendUrl} = useContext(AdminContext);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState()


  const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            if (state === 'Admin') {
                const {data}  = await axios.post(backendUrl + '/api/admin/admin-login', {email,password})
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token)
                    
                    
                }else{
                    toast.error(data.message)
                }
            }else{

            }
        } catch (error) {
            
        }
  }

  const toggleUserType = () => {
    setState(state === "Admin" ? "Doctor" : "Admin")
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-semibold text-gray-800 mb-12">{state}</h1>

          <form onSubmit={onSubmitHandler} className="space-y-8">
            {/* Email Input */}
            <div className="relative">
              <input onChange={(e) => setEmail(e.target.value)}
              value={email}
                type="email"
                required
                className="w-full py-3 text-gray-700 bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300 placeholder-transparent peer"
                placeholder="LOGIN"
                id="email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3 text-xs text-gray-500 tracking-wider font-medium"
              >
                LOGIN
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
               onChange={(e) => setPassword(e.target.value)}
              value={password}
                type="password"
                required
                className="w-full py-3 text-gray-700 bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300 placeholder-transparent peer"
                placeholder="PASSWORD"
                id="password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3 text-xs text-gray-500 tracking-wider font-medium"
              >
                PASSWORD
              </label>
            </div>

          

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 text-sm tracking-wider"
            >
              LOGIN
            </button>

            {/* Account Options */}
            <div className="text-center space-y-3 pt-4">
             

              <p className="text-gray-600 text-sm">
                {state === "Admin" ? "Doctor" : "Admin"} Login?{" "}
                <button 
                  type="button"
                  onClick={toggleUserType} 
                  className="text-blue-500 font-semibold hover:text-blue-600 transition-colors tracking-wider"
                >
                  Click Here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-50 flex items-center justify-center relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-blue-400 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-32 left-16 w-4 h-8 bg-blue-400 opacity-60 rounded-sm"></div>
        <div className="absolute bottom-20 right-20 w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-red-300 opacity-60"></div>
        <div className="absolute top-32 right-16 w-0 h-0 border-l-6 border-r-6 border-b-10 border-l-transparent border-r-transparent border-b-pink-300 opacity-60"></div>

       
      
      </div>
    </div>
  )
}

export default Login
