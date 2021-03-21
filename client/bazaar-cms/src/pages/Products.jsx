import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { AddProduct, deleteProduct, editProduct, fetchProduct, fetchProductById} from '../store/action'
export default function Products() {
  const { products } = useSelector((state) => (state.products))
  const { product } = useSelector((state) => (state.product))
  const { loading } = useSelector((state) => (state.products))
  const [showModal, setShowModal] = React.useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    image_url: ''
  })

  const [formDataEdit, setFormDataEdit] = useState({
    nameEdit: '',
    descriptionEdit: '',
    categoryEdit: '',
    priceEdit: 0,
    stockEdit: 0,
    image_urlEdit: ''
  })

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    
    if(name === 'image_url'){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        value = reader.result  
        setFormData({...formData, image_url:value})
      };
      reader.onerror = () => {
          console.error('ERROR');
      };
    }
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleOnChangeEdit = (e) => {
    let { name, value } = e.target;
    
    if(name === 'image_url'){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        value = reader.result  
        setFormDataEdit({...formData, image_url:value})
      };
      reader.onerror = () => {
          console.error('ERROR');
      };
    }
    setFormDataEdit((prev) => ({ ...prev, [name]: value }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(AddProduct(formData))
  }

  const handleOnSubmitEdit = (e) => {
    setShowModal(false)
    e.preventDefault()
    console.log('YEY');
    dispatch(editProduct(formDataEdit))
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }

  const handleEdit = (id) => {
    setShowModal(true)
    console.log(id, 'EIDTT ID');
    dispatch(fetchProductById(id))
  }

  useEffect(() => {
    if (!localStorage.access_token || localStorage.access_token === 'undefined') {
      history.push('/login')
    }
  })

  useEffect(() => {
    setFormDataEdit({
      nameEdit: 'EDIT BOS',
      descriptionEdit: product.description,
      categoryEdit: product.category,
      priceEdit: product.price,
      stockEdit: product.stock,
      image_urlEdit: product.image_url
    })
  }, [product])
  
  useEffect(() => {
    dispatch(fetchProduct()) 
    // dispatch(fetchProductById())
    // if (localStorage.access_token && !localStorage.access_token === 'undefined') {
    // }
  }, [dispatch])

  return (
    <>
      <div className="flex flex-wrap bg-gray-900 w-full h-screen">
        <Sidebar />
        <div className="w-10/12">
          <div className="w-full bg-green-500 text-white p-5">
            Product
          </div>
          <div className="w-full bg-gray-900 p-10">
            <div>
              <form onSubmit={handleOnSubmit} className="w-full mx-auto bg-white shadow rounded">
                <div>
                  <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                    <div className="flex items-center w-11/12 mx-auto">
                      <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Product</p>
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
                            <input
                              type="text"
                              value={formData.name} onChange={handleOnChange} name="name"
                              className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50"
                              placeholder="Name..."
                              
                            />
                          </div>
                          <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                            <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                Category
                            </label>
                            <input value={formData.category} onChange={handleOnChange} name="category"
                            type="text"  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50" placeholder="category.." />
                          </div>
                          <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                            <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                Price
                            </label>
                            <input value={formData.price} onChange={handleOnChange} name="price"
                            type="number" min="0"  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50" placeholder="0" />
                          </div>
                          <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                            <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                Stock
                            </label>
                            <input value={formData.stock} onChange={handleOnChange} name="stock"
                            type="number" min="0"  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50" placeholder="0" />
                          </div>
                          <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                            <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                Description
                            </label>
                            <textarea value={formData.description} onChange={handleOnChange} name="description"
                             type="text"  className="h-20 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50" placeholder="description..." />
                          </div>
                          <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                            <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                Image
                            </label>
                            <input onChange={handleOnChange} name="image_url"
                            type="file"  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500" />
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
                    <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Product Table</p> 
                  </div>
                </div>
                <table className="w-full text-md bg-white shadow-md rounded table-auto">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 px-5">Name</th>
                      <th className="text-left p-3 px-5">Image</th>
                      <th className="text-left p-3 px-5">Category</th>
                      <th className="text-left p-3 px-5">Price</th>
                      <th className="text-left p-3 px-5">Stock</th>
                      <th className="text-left p-3 px-5">Description</th>
                      <th className="text-center p-3 px-5">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      loading ? (<tr className="bg-red-500">
                        <td>LOADING BRO</td>
                      </tr>) :
                      (products?.map((product) => {
                        return (
                          <tr className="border-b hover:bg-orange-100" key={product.id}>
                            <td className="p-3 px-5 hover:bg-gray-100">{product.name}</td>
                            <td className="p-3 px-5 hover:bg-gray-100">
                              <img className="w-80" src={product.image_url} alt={product.name}/>
                            </td>
                            <td className="p-3 px-5 hover:bg-gray-100">{product.category}</td>
                            <td className="p-3 px-5 hover:bg-gray-100">{product.price}</td>
                            <td className="p-3 px-5 hover:bg-gray-100">{product.stock}</td>
                            <td className="p-3 px-5 hover:bg-gray-100">{product.description}</td>
                            <td className="p-3 px-5 hover:bg-gray-100 flex justify-center">
                              <button type="button" onClick={() => handleEdit(product.id)} className="mr-3 text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                              <button type="button" onClick={() => handleDelete(product.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                            </td>
                         </tr>
                    
                        )
                      }))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
        {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Product
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* <form onSubmit={handleOnSubmitEdit}> */}

                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="mx-auto xl:w-full xl:mx-0">
                      <div className="xl:flex lg:flex md:flex flex-wrap justify-between">
                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                          
                          <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                              Name
                          </label>
                          <input
                            type="text"
                            value={formDataEdit.nameEdit} onChange={handleOnChangeEdit} name="name"
                            className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50"
                            placeholder="Name..."
                          />
                        </div>
                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                          <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                              Category
                          </label>
                          <input value={formDataEdit.categoryEdit} onChange={handleOnChangeEdit} name="category"
                          type="text"  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50" placeholder="category.." />
                        </div>
                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                          <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                              Price
                          </label>
                          <input value={formDataEdit.priceEdit} onChange={handleOnChangeEdit} name="price"
                          type="number" min="0"  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50" placeholder="0" />
                        </div>
                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                          <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                              Stock
                          </label>
                          <input value={formDataEdit.stockEdit} onChange={handleOnChangeEdit} name="stock"
                          type="number" min="0"  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50" placeholder="0" />
                        </div>
                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                          <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                              Description
                          </label>
                          <textarea value={formDataEdit.descriptionEdit} onChange={handleOnChangeEdit} name="description"
                            type="text"  className="h-20 border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 placeholder-opacity-50" placeholder="description..." />
                        </div>
                        <div className="xl:w-2/5 lg:w-2/5 md:w-2/5 flex flex-col mb-6">
                          <label className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                              Image
                          </label>
                          <input onChange={handleOnChangeEdit} name="image_url"
                          type="file"  className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none bg-transparent focus:border-indigo-700 text-gray-800 dark:text-gray-100 placeholder-gray-500" />
                      </div>
                      </div>
                    </div>
                  </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-indigo-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                {/* </form> */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      </div>
    </>
  )
}