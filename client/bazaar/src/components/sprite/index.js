
function Sprite({player, image, data, position, updatePlayer }) {
  const { x, y, h, w } = updatePlayer.data
  
  return (
    <div className={`Sprite-container ${image}`} style={{
      height: `${h}px`,
      width: `${w}px`,
      backgroundPosition: `-${x}px -${y}px`,
      position: "absolute",
      top: updatePlayer.position.y,
      left: updatePlayer.position.x,
      backgroundRepeat: "no-repeat"
    }}>
      <div style={{ color: 'white', marginTop: '-30px', marginLeft: 0}}>
        <p className="h5" style={{color:'black', width: 'fit-content' }}>{player.name}</p>
      </div>
      {/* <div style={{ width: '26px', height: '9px', marginTop: '40px', backgroundColor: 'yellow', marginLeft: '3px', borderRadius: '30px' }}>
      </div> */}
    </div>
  );
}

export default Sprite;