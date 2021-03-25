import React, { useState } from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHistory, cartUpdateQty, deleteCart, fetchCarts } from "../../store/action";
import { Modal } from 'react-bootstrap'
import DataTable from "react-data-table-component";
import Swal from 'sweetalert2'

function Inventory() {

  const { carts } = useSelector((state) => (state.carts))

  const dispatch = useDispatch()

  const [totalPrice, setTotalPrice] = useState('')

  useEffect(() => {

    dispatch(fetchCarts())
  }, [dispatch])

  const handlePlusQty = (id) => {
    carts.forEach(el => {
      console.log(el, '<<');
      if (el.id === id) {
        if (el.quantity < el.Product.stock) {
          dispatch(cartUpdateQty({id, status: 'plus'}))
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Out Of Stock!!!',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 1000
          })
        }
      }
    })
  }
  const handleCheckout = (carts) => {
    // if (carts) {
    //   const dataIdCart = carts.map((cart) => cart.id)
    // }
    dispatch(addHistory(carts))
  }
  const handleMinusQty = (id) => {
    carts.forEach(el => {
      if (el.id === id && el.quantity <= 1) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteCart(id))
            Swal.fire(
              'Deleted!',
              'Your product has been deleted.',
              'success'
              )
            } else {
              dispatch(cartUpdateQty({id, status: 'plus'}))
            }
          })
      } else {
        dispatch(cartUpdateQty({id, status: 'minus'}))
      }
    });
  }
  
  const [show, setShow] = useState(false);

  const columns = [
    {
      name: "image",
      selector: "image_url",
      width: '25%',
      cell: row => <div><img style={{ height: 120 }} src={row?.Product?.image_url} alt={row?.Product?.name}/></div>,
      sortable: true
    },
    {
      name: "name",
      width: '15%',
      cell: row => <div>{row?.Product?.name}</div>,
      sortable: true
    },
    {
      name: "price",
      width: '15%',
      cell: row => <div>Rp. {row?.Product?.price.toLocaleString('id')}</div>,
      sortable: true
    },
    {
      name: "",
      cell: row => 
        <div className="d-flex">
          <button type="button" className="nes-btn is-primary" onClick={() => handleMinusQty(row?.id)}><i className="fas fa-minus"></i>
          </button>
          <div className="nes-field" style={{marginRight: 10, marginLeft: 10, width: 80}}>
            <input type="number" id="name_field" defaultValue={row?.quantity} className="nes-input"/>
          </div>
          <button type="button" className="nes-btn pl-10 is-primary" onClick={() => handlePlusQty(row?.id)}><i className="fas fa-plus"></i>
          </button>
        </div>,
      sortable: true
    },
    {
      name: "Total Price",
      width: '15%',
      cell: row => <div>Rp. {((row?.quantity * row?.Product?.price).toLocaleString('id'))}</div>,
      sortable: true
    },
  ];
  return (
    <div className="Inventory" style={{
      position: 'absolute',
      top: '10px',
      right: '10px',
    }}>
      <button onClick={() => setShow(true)} type="button" className="nes-btn" ><i className="bi bi-cart"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg></i></button>
      { show ? (
        <>

        <Modal show={show} size="lg">
          <div className="nes-dialog is-dark">

          <Modal.Header>
            {/* <Modal.Title>Merchant</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <DataTable
            title="Cart"
            columns={columns}
            data={carts}
            // data={test}
            defaultSortField="title"
            pagination
            // selectableRows
            // ectableRowsComponent={BootyCheckbox}
          />
          </Modal.Body>
          
          <Modal.Footer>
            <button type="button" className="nes-btn"  onClick={() => setShow(false)}>Close</button>
            <button type="button" className="nes-btn is-success" onClick={() => handleCheckout(carts)}>Checkout</button>
          </Modal.Footer>
          </div>

        </Modal>
          
        </>
      ) : null }
      {/* <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content nes-dialog is-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">User's Cart - Inventory</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                {
                  carts.map((cart) => (

                <div className="row">
                  <div className="col">
                    {cart.Product.name}
                    {JSON.stringify(cart)}
                  </div>
                  <div className="col">
                    {cart.Product.price}
                  </div>
                  <div className="col">
                    {cart.Product.image_url}
                    <img src={cart.Product.price} alt={cart.Product.name}/>
                  </div>
                </div>
                  ))
                }
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="nes-btn" data-bs-dismiss="modal">Close</button>
              <button type="button" className="nes-btn is-success">Checkout</button>
            </div>
          </div>
        </div>
      </div>
     */}
    </div>
  )
}

export default Inventory