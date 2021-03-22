import React from 'react'
import { useState } from "react";

export default function Booth() {
  const [showModal2, setShowModal] = useState(true)

  async function modaldeh() { 
    await setShowModal(true)
    await document.getElementById('dialog-dark').showModal(true)
   }
  return (
    <div>
          <button type="button" className="nes-btn is-primary" onClick={modaldeh}>
            Open dark dialog
          </button>
      { showModal2 ? (
        <>
        <div>asdasd</div>
          <dialog className="nes-dialog is-dark" id="dialog-dark">
            <form method="dialog">
              <p className="title">Dark dialog</p>
              <p>Alert: this is a dialog.</p>
              <menu className="dialog-menu">
                <button className="nes-btn">Cancel</button>
                <button className="nes-btn is-primary">Confirm</button>
              </menu>
            </form>
          </dialog>
        </>
      ) : null }
      </div>
  )
}