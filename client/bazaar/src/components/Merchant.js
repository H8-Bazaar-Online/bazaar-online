import armor1 from '../img/_armor/tile001.png'
export default function Merchant() {
  return (
    // <div className="Inventory" style={{
    //   position: 'absolute',
    //   top: '10px',
    //   right: '10px',
    // }}>
    //   <button type="button" className="nes-btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-cart"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
    //     <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    //   </svg></i></button>
    //   <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //     <div className="modal-dialog">
    //       <div className="modal-content nes-dialog is-dark">
    //         <div className="modal-header">
    //           <h5 className="modal-title" id="exampleModalLabel">User's Cart - Inventory</h5>
    //           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //         </div>
    //         <div className="modal-body">
    //           <div className="container-fluid">
    //             <div className="row">
    //               <div className="col-6 col-sm-6">
    //                 Image-Link
    //                       </div>
    //               <div className="col-6 col-sm-6">
    //                 Product
    //                       </div>
    //             </div>
    //             <div className="row">
    //               <div className="col-6 col-sm-6">
    //                 Image-Link
    //                       </div>
    //               <div className="col-6 col-sm-6">
    //                 Product
    //                       </div>
    //             </div>
    //             <div className="row">
    //               <div className="col-6 col-sm-6">
    //                 Image-Link
    //                       </div>
    //               <div className="col-6 col-sm-6">
    //                 Product
    //                       </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="modal-footer">
    //           <button type="button" className="nes-btn" data-bs-dismiss="modal">Close</button>
    //           <button type="button" className="nes-btn is-success">Checkout</button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="nes-table-responsive">
        <table className="nes-table is-bordered is-dark">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img className="nes-avatar" alt="" src={armor1} style={{imageRendering: "pixelated"}}/></td>
              <td><img className="nes-avatar" alt="" src={armor1} style={{imageRendering: "pixelated"}}/></td>
              <td><img className="nes-avatar" alt="" src={armor1} style={{imageRendering: "pixelated"}}/></td>
              <td><img className="nes-avatar" alt="" src={armor1} style={{imageRendering: "pixelated"}}/></td>
            </tr>
            <tr>
              <td><img className="nes-avatar" alt="" src={armor1} style={{imageRendering: "pixelated"}}/></td>
              <td><img className="nes-avatar" alt="" src={armor1} style={{imageRendering: "pixelated"}}/></td>
              <td><img className="nes-avatar" alt="" src={armor1} style={{imageRendering: "pixelated"}}/></td>
              <td><img className="nes-avatar" alt="" src={armor1} style={{imageRendering: "pixelated"}}/></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="card col-2">
  <div className="card-body bg-dark text-white">
  <div className="row">
    <div className="col-sm">
      One of three columns
    </div>
    <div className="col-sm">
      One of three columns
    </div>
    <div className="col-sm">
      One of three columns
    </div>
  </div>
  </div>
</div>    
    </div>
  
  )
}