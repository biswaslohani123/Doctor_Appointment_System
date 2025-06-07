import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

const Login = () => {

  const {token , setToken , backendUrl} = useContext(AppContext)

  const [state, setState] = useState("SignUp")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const onSubmitHandler = async (e) => {
         e.preventDefault()

         try {
            if (state === 'SignUp') {
              const {data} = await axios.post(backendUrl + '/api/user/register', {name, password, email})
              if (data.success) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                
              }else{
                toast.error(data.message)
              }
              
            }else{
               const {data} = await axios.post(backendUrl + '/api/user/login', { password, email})
              if (data.success) {
                localStorage.setItem('token', data.token)
                setToken(data.token)
                
              }else{
                toast.error(data.message)
              }
            }
         } catch (error) {
            console.log(error);
            toast.error(error.message)
            
         }
    
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login/Signup Form */}
      <div className="flex-1 flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            {state === "SignUp" ? "Create Account" : "Login"}
          </h1>
          <p className="text-gray-600 mb-12">
            Please {state === "SignUp" ? "create account" : "login"} to book appointment
          </p>

          <form onSubmit={onSubmitHandler} className="space-y-8">
            {state === "SignUp" && (
              <div className="relative">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  placeholder="Enter your full name"
                  className="w-full py-3 text-gray-700 bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  id="name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 -top-3 text-xs text-gray-500 tracking-wider font-medium"
                >
                  FULL NAME
                </label>
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                placeholder="Enter your email"
                className="w-full py-3 text-gray-700 bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                id="email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3 text-xs text-gray-500 tracking-wider font-medium"
              >
                EMAIL
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                placeholder="Enter your password"
                className="w-full py-3 text-gray-700 bg-transparent border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                id="password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3 text-xs text-gray-500 tracking-wider font-medium"
              >
                PASSWORD
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-full transition-colors duration-300 text-sm tracking-wider"
            >
              {state === "SignUp" ? "CREATE ACCOUNT" : "LOGIN"}
            </button>

            <div className="text-center pt-4">
              <p className="text-gray-600 text-sm">
                {state === "SignUp" ? "Already have an account?" : "Don't have an account?"}
                <span
                  onClick={() => setState(state === "SignUp" ? "Login" : "SignUp")}
                  className="ml-2 text-blue-500 cursor-pointer font-semibold hover:text-blue-600 transition-colors tracking-wider"
                >
                  {state === "SignUp" ? "LOGIN" : "CREATE ACCOUNT"}
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-50 flex items-center justify-center relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-red-300 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-32 left-16 w-4 h-8 bg-yellow-400 opacity-60 rounded-sm"></div>
        <div className="absolute bottom-20 right-20 w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-red-300 opacity-60"></div>
        <div className="absolute top-32 right-16 w-0 h-0 border-l-6 border-r-6 border-b-10 border-l-transparent border-r-transparent border-b-pink-300 opacity-60"></div>

      
      </div>
    </div>
  )
}

export default Login
