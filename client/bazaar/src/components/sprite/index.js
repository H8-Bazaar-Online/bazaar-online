
function Sprite({ image, data, position }) {
  const { x, y, h, w } = data
  // console.log(image)
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
      // backgroundImage: `url(./img/m1.png)`,
      backgroundRepeat: "no-repeat"
    }}>
    </div>
  );
}

export default Sprite;