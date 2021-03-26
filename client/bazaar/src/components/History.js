import React, { useState } from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistories } from "../store/action";
import { Modal } from 'react-bootstrap'
import DataTable from "react-data-table-component";

function History() {

  const { histories } = useSelector((state) => (state.histories))

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHistories())
  }, [dispatch])

  const [show, setShow] = useState(false);

  const columns = [
    {
      name: "image",
      selector: "image_url",
      width: '30%',
      cell: row => <div><img style={{ height: 120 }} src={row.image_url} alt={row.name}/></div>,
      sortable: true
    },
    {
      name: "Name",
      cell: row => <div>{row.name}</div>,
      sortable: true
    },
    {
      name: "Price",
      cell: row => <div>{row.price}</div>,
      sortable: true
    },
    {
      name: "Qty",
      cell: row => <div>{row.quantity}</div>,
      width: '10%',
      sortable: true
    },
    {
      name: "Total Price",
      cell: row => <div>Rp. {((row?.quantity * row?.price).toLocaleString('id'))}</div>,
      sortable: true
    },
  ];

  return (
    <div className="Inventory" style={{
      position: 'absolute',
      top: '10px',
      right: '70px',
    }}>
      <button onClick={() => setShow(true)} type="button" className="nes-btn" ><i className="fas fa-history"></i></button>
      
      { show ? (
        <>
        <Modal show={show} size="lg">
          <div className="nes-dialog is-dark">

          <Modal.Header>
            {/* <Modal.Title>Merchant</Modal.Title> */}
          </Modal.Header>
          <Modal.Body className="bg-white">
            <DataTable
            title="History"
            columns={columns}
            data={histories}
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
    </div>
  )
}

export default History