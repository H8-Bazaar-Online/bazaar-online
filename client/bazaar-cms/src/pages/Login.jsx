import React from 'react'
export default function Login() {
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
              Login
            </label>
            <form className="mt-10">
              <div>
                <input type="text" placeholder="Name" className="mt-1 pl-3 py-3 block w-full border focus:border-yellow-500 bg-gray-100 h-11 rounded-xl focus:outline-none shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 placeholder-gray-500 placeholder-opacity-30"/>
              </div>
              <div className="mt-7">                
                <input type="email" placeholder="Email" className="mt-1 pl-3 py-3 block w-full border focus:border-yellow-500 bg-gray-100 h-11 rounded-xl focus:outline-none shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 placeholder-gray-500 placeholder-opacity-30"/>                           
              </div>
              <div className="mt-7">                
                <input type="password" placeholder="Password" className="mt-1 pl-3 py-3 block w-full border focus:border-yellow-500 bg-gray-100 h-11 rounded-xl focus:outline-none shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 placeholder-gray-500 placeholder-opacity-30"/>                           
              </div>
              <div className="mt-7">
                <button className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Login
                </button>
              </div>
              <div className="flex mt-7 items-center text-center">
                <hr className="border-gray-300 border-1 w-full rounded-md"/>
                <p className="block font-medium text-sm text-gray-700 w-full">
                    Login
                </p>
                <hr className="border-gray-300 border-1 w-full rounded-md"/>
              </div>
              <div className="flex mt-7 justify-center w-full">
                <button className="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Google
                </button>
              </div>
  
              <div className="mt-7">
                <div className="flex items-center text-center">
                  <label className="w-full text-sm text-gray-600">Don't have an account?</label>
                  <a href="/#" className="w-full text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                    Create Account
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}