
function Sprite({player, image, data, position, updatePlayer }) {
  const { x, y, h, w } = updatePlayer.data
  
  return (
    <div className={`Sprite-container ${updatePlayer.character}`} style={{
      height: `${h}px`,
      width: `${w}px`,
      backgroundPosition: `-${x}px -${y}px`,
      position: "absolute",
      top: updatePlayer.position.y,
      left: updatePlayer.position.x,
      backgroundRepeat: "no-repeat"
    }}>
      <div style={{ color: 'white', marginTop: '-30px', marginLeft: -20}}>
        <p className="text-md" style={{color:'white', width: '300px'}}>{player.name}</p>
      </div>
      {/* <div style={{ width: '26px', height: '9px', marginTop: '40px', backgroundColor: 'yellow', marginLeft: '3px', borderRadius: '30px' }}>
      </div> */}
    </div>
  );
}

export default Sprite;