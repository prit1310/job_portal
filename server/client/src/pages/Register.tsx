import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { useAuth } from "../store/auth";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  })

  const handleInput = (e:any) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    })
  }

  const navigate = useNavigate()

  const {storeTokenInLS} = useAuth()
  
  const handleRegister = async (e:any) => {
      e.preventDefault();
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify(user),
        });     
  
        const responseData = await response.json();
  
        if (response.ok) {
          toast.success("registration successfully");
          setUser({ username: "", email: "", phone: "", password: "" });
          storeTokenInLS(responseData.token)
          navigate("/")
        } else {
          toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message)
        }
      } catch (error) {
        console.error("Error", error);
      }
  };
  return (
    <>
       <div className="min-h-screen flex items-center justify-center bg-teal-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-teal-600 mb-6">Register</h2>
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={user.username}
                            onChange={handleInput}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleInput}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={user.phone}
                            onChange={handleInput}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleInput}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="font-medium text-teal-600 hover:text-teal-500">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register
