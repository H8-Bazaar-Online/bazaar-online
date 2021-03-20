
const base_url = 'http://localhost:3001'
export function setFetchProduct(payload) {
  console.log(payload, '<<<<<<< KETRIGER');
  return { type: 'PRODUCTS/FETCH_ALL', payload }
}

export function fetchProduct() {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch(`${base_url}/products`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      const data = await response.json()
      dispatch(setFetchProduct(data))
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    }
  }
}

export function setAddProduct(payload) {
  return { type: 'PRODUCTS/SET_ADD_PRODUCT', payload }
}

export function setLoading(payload) {
  return { type: 'PRODUCTS/SET_LOADING', payload }
}

export function AddProduct(payload) {
  
  return async (dispatch) => {
    try {
      dispatch(setLoading(true))
      
      const uploadImage = await fetch('http://localhost:3001/products/uploadimage', {
        method: 'POST',
        body: JSON.stringify({ data: payload.image_url }),
        headers: { 'Content-Type': 'application/json', access_token: localStorage.getItem("access_token") }
      });
      const newUploadImage = await uploadImage.json()
      let newPayload = {...payload, image_url: newUploadImage}

      const response = await fetch(`${base_url}/products`, {
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        method: "POST",
        body: JSON.stringify(newPayload)
      })
      const data = await response.json()
      dispatch(setAddProduct(data))
      dispatch(fetchProduct())
      dispatch(setLoading(false))
    } catch (err) {
      console.log(err);
    }
  }
}

export function deleteProduct(payload) {
  return async (dispatch) => {
    try {
      await fetch(`${base_url}/products/${payload}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
          method: "delete"
        }
      );
      dispatch(fetchProduct());
    } catch (err) {
      console.log(err);
    }
  };
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
      console.log(data, '<<<<<< DATA');
      localStorage.access_token = data.access_token;
      // console.log(data, "<<< data");
      localStorage.name = data.name
    } catch (err) {
      console.log(err);
    }
  };
}

