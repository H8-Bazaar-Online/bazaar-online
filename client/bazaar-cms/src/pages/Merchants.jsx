import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { fetchMerchant } from '../store/action'

export default function Merchants() {
  const { merchants } = useSelector((state) => (state.merchants))
  const { loading } = useSelector((state) => (state.products))

  const history = useHistory()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMerchant())
  }, [dispatch])


  useEffect(() => {
    if (!localStorage.access_token || localStorage.access_token === 'undefined') {
      history.push('/login')
    }
  })
  return (
    <>
      <div className="flex flex-wrap bg-gray-900 w-full h-screen">
        <Sidebar />
        <div className="w-10/12">
          <div className="w-full bg-green-500 text-white p-5">
            Merchant
          </div>
          <div className="w-full bg-gray-900 p-10">
            <div>
              <form className="w-full mx-auto bg-white shadow rounded">
                <div>
                  <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                    <div className="flex items-center w-11/12 mx-auto">
                      <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Merchant</p>
                      <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                          <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-11/12 mx-auto">
                    <div className="container mx-auto">
                      <div className="my-8 mx-auto xl:w-full xl:mx-0">
                        <div className="xl:flex lg:flex md:flex flex-wrap justify-between">
                          <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                            <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                Name
                            </label>
                            <input type="text" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50" placeholder="Name..." />
                          </div>
                          <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                            <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                Category
                            </label>
                            <input type="text" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50" placeholder="category.." />
                          </div>
                          <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                            <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                Logo
                            </label>
                            <input type="file" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500" />
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full py-4 sm:px-12 px-4 bg-gray-300 dark:bg-gray-700 mt-6 flex justify-end rounded-bl rounded-br">
                    <button className="bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm focus:outline-none" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="w-full mx-auto bg-white shadow rounded mt-10">
              <div>
                <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                  <div className="flex items-center w-11/12 mx-auto">
                    <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Merchant Table</p> 
                  </div>
                </div>
                <table className="w-full text-md bg-white shadow-md rounded table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 px-5">Name</th>
                      <th className="text-left p-3 px-5">Category</th>
                      <th className="text-left p-3 px-5">Logo</th>
                      <th className="text-center p-3 px-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-orange-100">
                      <td className="p-3 px-5 hover:bg-gray-100">Name contoh</td>
                      <td className="p-3 px-5 hover:bg-gray-100">Fashion</td>
                      <td className="p-3 px-5 hover:bg-gray-100"><img src="https://dynamic.zacdn.com/lpv9Ca8dKJ2pYmnrlR9dwJG5Fww=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/tolliver-7205-5741852-4.jpg" alt=""/></td>
                      <td className="p-3 px-5 hover:bg-gray-100 flex justify-center">
                        <button type="button" className="mr-3 text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                        <button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-orange-100">
                      <td className="p-3 px-5 hover:bg-gray-100">Name contoh</td>
                      <td className="p-3 px-5 hover:bg-gray-100">Fashion</td>
                      <td className="p-3 px-5 hover:bg-gray-100"><img src="https://dynamic.zacdn.com/lpv9Ca8dKJ2pYmnrlR9dwJG5Fww=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/tolliver-7205-5741852-4.jpg" alt=""/></td>
                      <td className="p-3 px-5 hover:bg-gray-100 flex justify-center">
                        <button type="button" className="mr-3 text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                        <button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-orange-100">
                      <td className="p-3 px-5 hover:bg-gray-100">Name contoh</td>
                      <td className="p-3 px-5 hover:bg-gray-100">Fashion</td>
                      <td className="p-3 px-5 hover:bg-gray-100"><img src="https://dynamic.zacdn.com/lpv9Ca8dKJ2pYmnrlR9dwJG5Fww=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/tolliver-7205-5741852-4.jpg" alt=""/></td>
                      <td className="p-3 px-5 hover:bg-gray-100 flex justify-center">
                        <button type="button" className="mr-3 text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                        <button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}