import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { register } from '../store/action';
export default function Register() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    logo: '',
    category: '',
    role: 'merchant'
  })
  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  const dispatch = useDispatch()

  const history = useHistory()

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(register(formData))
      history.push('/login')
  }


  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-900 ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute  transform -rotate-6">
          </div>
          <div className="card bg-yellow-400 shadow-lg w-full h-full rounded-3xl absolute  transform rotate-6">
          </div>
          <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
            <label className="block text-sm text-gray-700 text-center font-semibold">
              Register
            </label>
            <form onSubmit={handleOnSubmit} className="mt-10">
              <div className="mt-7">                
                <input value={formData.username} onChange={handleOnChange} name="username" type="text" placeholder="Username" className="mt-1 pl-3 py-3 block w-full border focus:border-yellow-500 bg-gray-100 h-11 rounded-xl focus:outline-none shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 placeholder-gray-500 placeholder-opacity-30"/>                           
              </div>
              <div className="mt-7">                
                <input value={formData.email} onChange={handleOnChange} name="email" type="email" placeholder="Email" className="mt-1 pl-3 py-3 block w-full border focus:border-yellow-500 bg-gray-100 h-11 rounded-xl focus:outline-none shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 placeholder-gray-500 placeholder-opacity-30"/>                           
              </div>
              <div className="mt-7">                
                <input value={formData.password} onChange={handleOnChange} name="password" type="password" placeholder="*******" className="mt-1 pl-3 py-3 block w-full border focus:border-yellow-500 bg-gray-100 h-11 rounded-xl focus:outline-none shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 placeholder-gray-500 placeholder-opacity-30"/>                           
              </div>
              <div className="mt-7">                
                <input value={formData.name} onChange={handleOnChange} name="name" type="text" placeholder="Name of Merchant" className="mt-1 pl-3 py-3 block w-full border focus:border-yellow-500 bg-gray-100 h-11 rounded-xl focus:outline-none shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 placeholder-gray-500 placeholder-opacity-30"/>                           
              </div>
              <div className="mt-7">                
                <input onChange={handleOnChange} name="logo" type="file" placeholder="Email" className="mt-1 pl-3 px-3 pt-2 block w-full border focus:border-yellow-500 bg-gray-100 h-11 rounded-xl focus:outline-none shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 placeholder-gray-500 placeholder-opacity-30"/>                           
              </div>
              <div className="mt-7">                
                <input value={formData.category} onChange={handleOnChange} name="category" type="text" placeholder="Category" className="mt-1 pl-3 py-3 block w-full border focus:border-yellow-500 bg-gray-100 h-11 rounded-xl focus:outline-none shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 placeholder-gray-500 placeholder-opacity-30"/>                           
              </div>
              <div className="mt-7">
                <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Register
                </button>
              </div>
              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md"/>
              </div>
  
              <div className="mt-7">
                <div className="flex items-center text-center">
                  <label className="w-full text-sm text-gray-600">Already have an account? </label>
                  <NavLink to='/login' className="w-full text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Login
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}