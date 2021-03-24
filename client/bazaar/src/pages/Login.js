import React, { useState }from 'react'
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom';
import { login } from '../store/action';
import img1 from './crop1.png'
import img2 from './crop2.png'
import img3 from './crop3.png'
import img4 from './crop4.png'
import '../App.css'

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  //LOGIN
  const handleOnSubmitLogin = (e) => {
    e.preventDefault()
    dispatch(login(formData))
    setFormData({
      email: '',
      password:''
    })
    history.push('/game')
  }

  const handleOnChange = (e)=>{
    let {name, value} = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const backToRegister = (e) => {
    history.push('/register')
  }
  
  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center align-center'>
        <div className='col-6'>
          <div id="container" className="nes-container is-dark with-title is-centered">
            <p className="title">Login</p>
            <label for="name_field">Email:</label>
              <div className="nes-field">
                <input type="email" id="name_field" name='email' value={formData.email} onChange={handleOnChange} className="nes-input is-dark"/>
              </div>
              <label for="password_field">Password:</label>
              <div className="nes-field">
                <input type="password" id="password_field" name='password' value={formData.password} onChange={handleOnChange}  className="nes-input is-dark"/>
              </div>
              <br></br>
              <div>
                <p>Choose your Avatar</p>
                <label>
                  <input type="radio" className="nes-radio" value='char1' name="character" />
                  <span  ><img src={img1} style={{height: '80px'}}/></span>
                </label>
                <label>
                  <input type="radio" className="nes-radio" value='char2' name="character" />
                  <span><img src={img2} style={{height: '80px'}}/></span>
                </label>
                <label>
                  <input type="radio" className="nes-radio" value='char3' name="character" />
                  <span><img src={img3} style={{height: '80px'}}/></span>
                </label>
                <label>
                  <input type="radio" className="nes-radio" value='char4' name="character" />
                  <span><img src={img4} style={{height: '80px'}}/></span>
                </label>
              </div>
              <br></br> 
              <div>
                <button type="button"  className="nes-btn is-primary" onClick={handleOnSubmitLogin}>Submit
                </button>
              </div>
              <br></br>
            <button type="button" className="nes-btn is-secondary" onClick={backToRegister}>Back to register</button>
          </div>
        </div>
      </div>
    </div>
  )
}
