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
    password: '',
    character: ''
  })

  //LOGIN
  const handleOnSubmitLogin = (e) => {
    e.preventDefault()
    dispatch(login(formData))
    setFormData({
      email: '',
      password:'',
      character: ''
    })
    history.push('/game')
  }

  const handleOnChange = (e)=>{
    let {name, value} = e.target
    console.log(value);
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const backToRegister = (e) => {
    history.push('/register')
  }

  // const handleOnChange = (e) => {
  //   let {name, value} = e.target
  //   console.log(value,"CHAR NAME");
  // }
  
  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center align-center'>
        <div className='col-6'>
          <div id="container" className="nes-container with-title is-dark is-centered" style={{marginTop: "5rem"}}>
            <p className="title">Login</p>
            <div className="mt-4">
              <label>Email:</label>
              <div className="nes-field d-flex justify-content-center ml-5">
                <input type="email" style={{width: 350}} id="name_field" name='email' value={formData.email} onChange={handleOnChange} className="nes-input is-dark"/>
              </div>
            </div>
            <div className="mt-4">
              <label>Password:</label>
              <div className="nes-field d-flex justify-content-center">
                <input type="password" style={{width: 350}} id="password_field" name='password' value={formData.password} onChange={handleOnChange} className="nes-input is-dark"/>
              </div>
            </div>
              <br></br>
              <div>
                <p>Choose your Avatar</p>
                <label>
{/* //                   <input type="radio" className="nes-radio" value='char1' name="character" />
//                   <span><img src={img1} alt="" style={{height: '80px'}}/></span>
//                 </label>
//                 <label>
//                   <input type="radio" className="nes-radio" value='char2' name="character" />
//                   <span><img src={img2} alt="" style={{height: '80px'}}/></span>
//                 </label>
//                 <label>
//                   <input type="radio" className="nes-radio" value='char3' name="character" />
//                   <span><img src={img3} alt="" style={{height: '80px'}}/></span>
//                 </label>
//                 <label>
//                   <input type="radio" className="nes-radio" value='char4' name="character" />
//                   <span><img src={img4} alt="" style={{height: '80px'}}/></span>
// ======= */}
                  <input type="radio" onChange={handleOnChange} className="nes-radio" value='char1' name="character" />
                  <span><img src={img1} alt="" style={{height: '80px'}}/></span>
                </label>
                <label>
                  <input type="radio" onChange={handleOnChange} className="nes-radio" value='char2' name="character" />
                  <span><img src={img2} alt="" style={{height: '80px'}}/></span>
                </label>
                <label>
                  <input type="radio" onChange={handleOnChange} className="nes-radio" value='char3' name="character" />
                  <span><img src={img3} alt="" style={{height: '80px'}}/></span>
                </label>
                <label>
                  <input type="radio" onChange={handleOnChange} className="nes-radio" value='char4' name="character" />
                  <span><img src={img4} alt="" style={{height: '80px'}}/></span>
               </label>
              </div>
              <br></br> 
              <div>
                <button type="button" className="nes-btn is-primary" onClick={handleOnSubmitLogin}>Login</button>
              </div>
              <hr className="text-white"></hr>
                <button type="button" className="nes-btn is-secondary" onClick={backToRegister}>Don't have an account?</button>
          </div>
        </div>
      </div>
    </div>
  )
}
