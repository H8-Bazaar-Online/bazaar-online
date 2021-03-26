import Swal from 'sweetalert2'
const base_url = 'http://18.140.68.162:80'

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export function setFetchProduct(payload) {
  return { type: 'PRODUCTS/FETCH_ALL', payload }
}

export function fetchProduct(payload) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch(`${base_url}/customer-products/${payload}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        }
      })
      const data = await response.json()
      dispatch(setFetchProduct(data))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    }
  }
}

export function setFetchProductById(payload) {
  return { type: 'PRODUCTS/FETCH_BY_ID', payload }
}

export function setFetchMerchantById(payload) {
  return { type: 'MERCHANTS/FETCH_BY_ID', payload }
}

export function fetchProductById(payload) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch(`${base_url}/products/${payload}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      const data = await response.json()
      dispatch(setFetchProductById(data))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    } 
  }
}

export function fetchMerchantById(payload) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch(`${base_url}/merchants/${payload}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      const data = await response.json()
      dispatch(setFetchMerchantById(data))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    } 
  }
}
             
export function setFetchMerchant(payload) {
  return { type: 'MERCHANTS/FETCH_ALL', payload }
}

// export function fetchMerchant() {
//   console.log('MASUK SINI');
//   return async (dispatch) => {
//     try {
//       dispatch(setLoading(true))
//       const response = await fetch(`${base_url}/customer-merchants`, {
//         headers: {
//           access_token: localStorage.getItem("access_token"),
//         },
//       })
//       const data = await response.json()
//       dispatch(setFetchMerchant(data))
//       dispatch(setLoading(false))
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

export function setFetchCarts(payload) {
  return { type: 'CARTS/FETCH_ALL', payload }
}

export function fetchCarts() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch(`${base_url}/carts`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      const data = await response.json()
      dispatch(setFetchCarts(data))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    }
  }
}

export function setFetchHistories(payload) {
  return { type: 'HISTORIES/FETCH_ALL', payload }
}

export function fetchHistories() {
  return async (dispatch) => {  
    try {
      dispatch(setLoading(true))
      const response = await fetch(`${base_url}/histories`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      const data = await response.json()
      dispatch(setFetchHistories(data))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    }
  }
}

export function setAddHistory(payload) {
  return { type: 'MERCHANTS/SET_ADD_MERCHANT', payload }
}

export function addHistory(payload) {
  console.log(payload, '<<<<<<<<<<<< PAYLOAD');
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      for (const el of payload) {
        // console.log(el, '<<<<<<');
        const response = await fetch(`${base_url}/histories/${el.product_id}`, {
          headers: {
            "Content-Type": "application/json",
            access_token: localStorage.getItem("access_token"),
          },
          method: "POST",
          body: JSON.stringify(payload)
        })
        const data = await response.json()
        console.log(data, '<<<<<<<<< DATA');
        dispatch(setAddHistory(data))
        await fetch(`${base_url}/carts/${el.id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          method: "DELETE"
        })
        if (!response.ok) {
          throw (data)
        }
        dispatch(fetchCarts())
        dispatch(fetchHistories())
      }
      Toast.fire({
        icon: 'success',
        title: 'Success checkout'
      })
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err, '<<<<<<<<<'); 
      // Swal.fire({
      //   title: 'Error !', 
      //   text: err.data.message.map(error => {return (` ${error}`)}),
      //   icon: 'error'
      // })
    }
  }
}

export function cartUpdateQty(payload) {
  const {id, status} = payload
  return async (dispatch) => {  
    try {
      dispatch(setLoading(true))
      await fetch(`${base_url}/carts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        method: "PATCH",
        body: JSON.stringify(payload)
      })
      dispatch(fetchCarts())
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    }
  }
}

export function setAddCart(payload) {
  return { type: 'MERCHANTS/SET_ADD_MERCHANT', payload }
}

export function addCart(payload) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch(`${base_url}/carts/${payload}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        method: "POST"
      })
      const data = await response.json()
      if (!response.ok) {
        throw (data)
      }
      dispatch(setAddCart(data))
      dispatch(fetchCarts())
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err, '<<<<<<<<<<');
      // Swal.fire({
      //   title: 'Error !', 
      //   text: err.data.message.map(error => {return (` ${error}`)}),
      //   icon: 'error'
      // })
    }
  }
}

export function setDeleteCart(payload) {
  return { type: 'HISTORIES/SET_DELETE', payload }
}

export function deleteCart(payload) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      await fetch(`${base_url}/carts/${payload}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        method: 'DELETE'
      })
      dispatch(fetchCarts())
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    }
  }
}

export function setLoading(payload) {
  return { type: 'PRODUCTS/SET_LOADING', payload }
}

export function setUsername(payload) {
  return { type: 'PRODUCTS/SET_USERNAME', payload }
}

export function login(payload) {
  console.log(payload, '<<<<');
  return async (dispatch) => {
    try {
      const response = await fetch(`${base_url}/users/login`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        const data = await response.json()
        throw ({data})
      }
      const data = await response.json()
      localStorage.access_token = await data.access_token;
      localStorage.name = await data.name
      localStorage.character = await payload.character
      dispatch(setUsername(data.name))
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
       Toast.fire({
        icon: "success",
        title: "Login Success"
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error !', 
        text: err.data.message.map(error => {return (` ${error}`)}),
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
    }
  };
}

export function register (payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${base_url}/users/register`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      if (!response.ok) {
        throw ({data})
      }
      Swal.fire({
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        title: 'Success', 
        text: 'Registered Successfully', 
        icon: 'success'})

    } catch (err) {
      console.log(err.data);
      Swal.fire({
        title: 'Error !', 
        text: err.data.message.map(error => {return (` ${error}`)}),
        icon: 'error'})
    }
  };
}

export function setSocketConnect(payload) {
  return { type: 'SOCKET/SET_CONNECT', payload }
}

export function setSocketPlayer(payload) {
  return { type: 'SOCKET/SET_PLAYER', payload }
}

export function setSocketPlayers(payload) {
  return { type: 'SOCKET/SET_PLAYERS', payload }
}
export function setSocketUpdatePlayers(payload) {
  return { type: 'SOCKET/SET_UPDATEPLAYERS', payload }
}
