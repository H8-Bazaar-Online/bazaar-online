import React from 'react'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
  return (
    <div className="flex flex-wrap bg-gray-900 w-full h-screen">
        <Sidebar />
        <div className="w-10/12">
          <div className="w-full bg-green-500 text-white p-5">
            Dashboard
          </div>
          <div className="w-full bg-gray-900 p-10">

          </div>
        </div>
    </div>
  )
}