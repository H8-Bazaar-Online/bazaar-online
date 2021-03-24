
const base_url = 'http://localhost:3001'

export function setFetchProduct(payload) {
  return { type: 'PRODUCTS/FETCH_ALL', payload }
}

export function fetchProduct(payload) {
  return async (dispatch) => {
    try {
      console.log('====================================');
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

export function fetchMerchant() {
  return async (dispatch) => {
    console.log('==================================== FETCH MERCHANTS');
    try {
      console.log('==========================');
      dispatch(setLoading(true))
      const response = await fetch(`${base_url}/customer-merchants`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      console.log('====================');
      const data = await response.json()
      dispatch(setFetchMerchant(data))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    }
  }
}

export function setLoading(payload) {
  return { type: 'PRODUCTS/SET_LOADING', payload }
}

export function login(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${base_url}/users/login`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      localStorage.access_token = await data.access_token;
      localStorage.name = await data.name
    } catch (err) {
      console.log(err);
    }
  };
}

export function register (payload) {
  return async (dispatch) => {
    try {
      await fetch(`${base_url}/users/register`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
    } catch (err) {
      console.log(err);
    }
  };
}

export function setSocketConnect(payload) {
  console.log(payload, '<<<<<<<<<<<<< SOCKET CONNECT');
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
