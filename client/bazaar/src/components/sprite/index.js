
function Sprite({ image, data, position }) {
  const { x, y, h, w } = data
  // console.log(typeof(image))
  return (
    <div className="Sprite-container" style={{
      height: `${h}px`,
      width: `${w}px`,
      backgroundPosition: `-${x}px -${y}px`,
      position: "absolute",
      top: position.y,
      left: position.x,
      // error in importing image using in-line style
      backgroundImage: image,
      backgroundRepeat: "no-repeat"
    }}>
      <div style={{ color: 'white', marginTop: '-40px', marginLeft: 3}}>
        <p style={{ backgroundColor: 'red', width: 'fit-content' }}>{localStorage.name}</p>
      </div>
      <div style={{ width: '26px', height: '9px', marginTop: '40px', backgroundColor: 'yellow', marginLeft: '3px', borderRadius: '30px' }}>
      </div>
    </div>
  );
}

export default Sprite;