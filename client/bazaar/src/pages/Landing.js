import React from 'react'
import { useHistory } from 'react-router-dom';
import '../App.css'

export default function Landing() {
  const history = useHistory()

  const toRegister = (e) => {
    e.preventDefault()
    history.push('/register')
  }
  
  const toLogin = (e) => {
    e.preventDefault()
    history.push('/login')
  }

  return (
    <div className='container-fluid'>
      <div className='d-flex justify-content-center align-center'>
        <div className='col-6'>
          <div className="nes-container with-title is-centered text-white">
            <h1 className="title">Virtual Bazaar</h1>
              <p>Welcome To The Most Anticipated Event of The Year</p>
              <p>This year, our theme is local products and SME's</p>
              <p>Our main attractions are:</p>
              <p>Flash Sale</p>
              <p>Product Launching</p>
              <p>Auction of rare collectible items</p>
              <p>Get Excited as we are? Come and join this event!!</p>
              <p>This event supported by:</p>
              <img src="https://www.clipartkey.com/mpngs/m/164-1640320_hacktiv8-logo.png" alt="" style={{imageRendering: 'pixelated', height: '80px'}}/>
                <br></br>
                <br></br>
              <button type="button" className="nes-btn is-primary" onClick={toRegister}>Register</button>
            <button type="button" className="nes-btn is-success" onClick={toLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
    
  )
}
