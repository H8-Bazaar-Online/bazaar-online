import Actor from '../actor/index'
import useKeyPress from '../hooks/use-key-press/index'
import useWalk from '../hooks/use-walk'
import { tiles } from '../map/tiles'
import { useHistory } from 'react-router-dom'
import Booth from '../Booth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct, fetchMerchant } from '../../store/action'

function Player({ skin, player }) {
  const { merchants } = useSelector((state) => (state.merchants))
  const { products } = useSelector((state) => (state.products))
  console.log(products, '<<<<<<<<<<<<');


  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchProduct()) 
    // dispatch(fetchMerchant()) 
  }, [])
  const { dir, step, walk, position } = useWalk(3, player)
  const data = {
    h: 32,
    w: 32
  }

  const [showModal2, setShowModal] = useState(false)

  async function modaldeh(id) { 
    console.log(id, '<<<<<<<<<<<<<< ID');
    console.log('tess');
    dispatch(fetchProduct(id)) 

    await setShowModal(true)
    // await document.getElementById('dialog-dark').showModal(true)
  }

  const history = useHistory()  

  useKeyPress((e) => {
    if (e.keyCode === 13) {
      let arrayX = Math.round((position.x - 4) / 40)
      let arrayY = Math.round((position.y - 24) / 40)
      if (tiles[arrayY - 1][arrayX] === 9) {
        // <Booth onClick={modaldeh}/>  
        // history.push('/buy-product')
        modaldeh()
        alert('Iya mau apa?')
        return console.log('ACTION')
      } if (tiles[arrayY - 1][arrayX] === 8) {
        alert('go to chat room')
        // history.push('/chat')
        modaldeh(1)
        // return console.log('ACTION')
      } else {
        return console.log('no valid action is within range')
      }
    } else if (e.keyCode === 32) {
      document.getElementById('outlined-multiline-static').focus()
    } else if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
      e.preventDefault()
      const direction = e.key.replace("Arrow", "").toLowerCase()
      walk(direction)
    }
  })
  return (
    <>
    <Actor sprite={`./img/${skin}.png`} data={data} step={step} dir={dir} position={position} />
      { showModal2 ? (
        <>
        <div>asdasd</div>
          {/* <dialog className="nes-dialog is-dark" id="dialog-dark">
            <form method="dialog">
              <p className="title">Dark dialog</p>
              <p>Alert: this is a dialog.</p>
              <menu className="dialog-menu">
                <button className="nes-btn">Cancel</button>
                <button className="nes-btn is-primary">Confirm</button>
              </menu>
            </form>
          </dialog> */}
          {/* <div>{JSON.stringify(merchants)}</div> */}
          <div>{JSON.stringify(products)}</div>
          <div className="nes-dialog is-dark" id="dialog-dark">
            <form method="dialog">
              <p className="title">Dark dialog</p>
              <p>Alert: this is a dialog.</p>
              <menu className="dialog-menu">
                <button className="nes-btn">Cancel</button>
                <button className="nes-btn is-primary">Confirm</button>
              </menu>

            </form>
          </div>
        </>
      ) : null }
    </>
  )
}

export default Player;
