import React, { useState }from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { register } from '../store/action';
import '../App.css'

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory()
  
  const [formDataRegis, setFormDataRegis] = useState({
    username: '',
    email: '',
    password:'',
    role:'customer'
  })
  //register
  const handleOnSubmitRegister = (e) => {
    e.preventDefault()
    dispatch(register(formDataRegis))
    setFormDataRegis({
      username: '',
      email: '',
      password:'',
      role:'customer'
    })
    history.push('/login')
  }
 
  const handleOnChangeRegis = (e)=>{
    let {name, value} = e.target
    setFormDataRegis((prev) => ({ ...prev, [name]: value }))
  }
  const backToLogin = (e) => {
    history.push('/login')
  }
  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center align-center'>
        <div className='col-6'>
          <div id="container" className="nes-container is-dark with-title is-centered" style={{marginTop: "7rem"}}>
            <p className="title">Register</p>
              <label for="name_field" className="mt-3">Username:</label>
              <div className="nes-field">
                <input name='username' value={formDataRegis.username} onChange={handleOnChangeRegis} type="text"id="name_field" className="nes-input is-dark"/>
              </div>
                <label for="name_field" className="mt-3">Email:</label>
                <div className="nes-field">
                  <input name='email' value={formDataRegis.email} onChange={handleOnChangeRegis} type="email" id="name_field"className="nes-input is-dark"/>
                </div>
                  <label for="password_field" className="mt-3">Password:</label>
                <div className="nes-field">
                  <input name='password' value={formDataRegis.password} onChange={handleOnChangeRegis} type="password"id="password_field" className="nes-input is-dark"/>
                </div>
                <br></br>      
              <button type="button" className="nes-btn is-secondary" onClick={backToLogin}>Back to Login</button>
              <button type="button" className="nes-btn is-primary" onClick={handleOnSubmitRegister}>Submit</button>

          </div>
        </div>
      </div>
    </div>
  )
}
