import React from 'react'
import Actor from '../actor/index'
import useKeyPress from '../hooks/use-key-press/index'
import useWalk from '../hooks/use-walk'
import { tiles } from '../map/tiles'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProduct, addCart, fetchCarts } from '../../store/action'
import { Modal } from 'react-bootstrap'
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2'

function Player({ skin, player, updatePlayer }) {
  const { products } = useSelector((state) => (state.products))
  const { carts } = useSelector((state) => (state.carts))
  const {socketConnect } = useSelector((state) => state.socketConnect)

  const dispatch = useDispatch();
  
  const { dir, step, walk, position } = useWalk(4, player, updatePlayer)
  
  const data = {
    h: 48,
    w: 32
  }
  const currentPosition = () => {
    if (socketConnect) {
      socketConnect.emit('playerPos', {...updatePlayer, character : localStorage.character , position: { x: position.x, y: position.y }, data: { x: step * data.w, y: dir * data.h, h: data.h, w: data.w }, })
    }
  }

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
  const handleAddToCart = (id) => {
    if (id) {
      Toast.fire({
        icon: 'success',
        title: 'Success add to stock'
      })
      dispatch(addCart(id))
    }
  }

  const columns = [
    {
      name: "image",
      selector: "image_url",
      cell: row => <div><img style={{ height: 80 }} src={row.image_url} alt={row.name}/></div>,
      sortable: false
    },
    {
      name: "name",
      selector: "name",
      cell: row => <div style={{fontSize: 10}}>{row.name}</div>,
      sortable: true,
    },
    {
      name: "price",
      cell: row => <div style={{fontSize: 10}}>Rp. {row.price.toLocaleString('id')}</div>,
      sortable: true,
    },
    {
      name: "actions",
      selector: "actions",
      cell: row => <div>
        {
          row.stock === 0 ? (
              <button type="button" className="nes-btn is-disabled" disabled>Out Of Stock</button>
            ) : (
              <button type="button" className="nes-btn is-info" onClick={() => handleAddToCart(row.id)}>Add to cart</button>
          )
        }
        </div>,
      sortable: false
    }
  ]
  
  const [show, setShow] = useState(false);

  function modaldeh(id) {
    for (let i = 1; i <= 8; i++) {
      if (id === i) {
        dispatch(fetchProduct(i))
      }
    }
    setShow(true)
  }
  // console.log(products, '<<< prod');

  useEffect(() => {
    dispatch(fetchCarts())
  }, [dispatch])

  // console.log(carts, ' <<<<<<<<<<<<<<< CARTS');


  const history = useHistory()
  useKeyPress((e) => {
    if (e.keyCode === 13) {
      let arrayX = Math.round((position.x - 4) / 40)
      let arrayY = Math.round((position.y - 24) / 40)
      // if (tiles[arrayY - 1][arrayX] < 50 && tiles[arrayY - 1][arrayX] > 10) {
      //   // <Booth onClick={modaldeh}/>  
      //   // history.push('/buy-product')
      //   // modaldeh()
      //   alert('Iya mau apa?')
      //   return console.log('ACTION')
      // } 
      if (tiles[arrayY - 1][arrayX] < 50) {
        modaldeh(tiles[arrayY - 1][arrayX])
      } else {
        return console.log('no valid action is within range')
      }
    } else if (e.keyCode === 32) {
      document.getElementById('outlined-multiline-static').focus()
    } else if (updatePlayer.name === localStorage.name) {
      if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault()
        const direction = e.key.replace("Arrow", "").toLowerCase()
        walk(direction)
        currentPosition()
      }
    } 
  })
  const handleLogout = (e) => {
    localStorage.clear()
    history.push('/')
  }
  return (
    <>
    <div className="Inventory" style={{
      position: 'absolute',
      bottom: '10px',
      right: '10px',
    }}>
      <button onClick={handleLogout} type="button" className="nes-btn" ><i className="fas fa-sign-out-alt"></i></button>
    </div>
    {/* <Actor sprite={`./img/${skin}.png`} data={data} step={step} dir={dir} position={position} player={player} /> */}
    <Actor sprite={skin} data={data} step={step} dir={dir} position={position} updatePlayer={updatePlayer} player={player} />
        
      { show ? (
        <>

        <Modal show={show} size="lg">
          <div className="nes-dialog is-dark">

          <Modal.Header>
            {/* <Modal.Title>Merchant</Modal.Title> */}
          </Modal.Header>
          <Modal.Body className="bg-white">
            {/* Woohoo, you're reading this text in a modal! */}
            
            <DataTable
            title="Merchant"
            columns={columns}
            data={products}
            // data={test}
            defaultSortField="name"
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5,10,20,30]}
            pagination
            responsive
          />
          </Modal.Body>
          
          <Modal.Footer>
            <button type="button" className="nes-btn"  onClick={() => setShow(false)}>Close</button>
          </Modal.Footer>
          </div>

        </Modal>
          
        </>
      ) : null }
    </>
  )
}

export default Player;
