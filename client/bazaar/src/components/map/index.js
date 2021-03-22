import './style.css'

function getTileSprite(type){
  switch (type){
    case 0:
      return 'grass'
    case 1:
      return 'road'
    case 9:
      return 'house'
    default:
      return 'grass'
  }
}

function MapTile(props) {
  return <div 
  className={`tile ${getTileSprite(props.tile)}`}
  style={{
    height: 40,
    width: 40
  }}
  >
  </div>
}

function MapRow(props) {
  return <div className="row">
    {
      props.tiles.map((tile, index) => <MapTile tile={tile} key={index}/>)
    }
  </div>
}

function Map(props) {
  return (
    <div className="Map" style={{
      position: 'relative',
      top: '0px',
      left: '0px',
      width: '800px',
      // height: '400px',
      backgroundColor: 'grey',
      border: '4px solid white',
    }}>
      {
        props.tiles.map((row, index) => <MapRow tiles={row} key={index}/>)
      }
    </div>
  )
}

export default Map