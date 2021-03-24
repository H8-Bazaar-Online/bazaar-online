import './style.css'

function getTileSprite(type) {
  switch (type) {
    case 0:
      return 'sand'
    case 2:
      return 'grass'
    case 4:
      return 'road'
    case 5:
      return 'water'
    case 6:
      return 'fountain1'
    case 7:
      return 'fountain2'
    case 8:
      return 'fountain3'
    case 9:
      return 'fountain4'
    case 11:
      return 'merchant-fashion1'
    case 111:
      return 'fashion11'
    case 112:
      return 'fashion12'
    case 113:
      return 'fashion13'
    case 114:
      return 'fashion14'
    case 12:
      return 'merchant-fashion2'
    case 121:
      return 'fashion21'
    case 122:
      return 'fashion22'
    case 123:
      return 'fashion23'
    case 124:
      return 'fashion24'
    case 21:
      return 'merchant-food1'
    case 211:
      return 'food11'
    case 212:
      return 'food12'
    case 213:
      return 'food13'
    case 214:
      return 'food14'
    case 22:
      return 'merchant-food2'
    case 221:
      return 'food21'
    case 222:
      return 'food22'
    case 223:
      return 'food23'
    case 224:
      return 'food24'
    case 23:
      return 'merchant-food3'
    case 231:
      return 'food31'
    case 232:
      return 'food32'
    case 233:
      return 'food33'
    case 234:
      return 'food34'
    case 24:
      return 'merchant-food4'
    case 241:
      return 'food41'
    case 242:
      return 'food42'
    case 243:
      return 'food43'
    case 244:
      return 'food44'
    case 31:
      return 'merchant-jew1'
    case 311:
      return 'jew11'
    case 312:
      return 'jew12'
    case 313:
      return 'jew13'
    case 314:
      return 'jew14'
    case 32:
      return 'merchant-jew2'
    case 321:
      return 'jew21'
    case 322:
      return 'jew22'
    case 323:
      return 'jew23'
    case 324:
      return 'jew24'
    default:
      return 'sand'
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
      props.tiles.map((tile, index) => <MapTile tile={tile} key={index} />)
    }
  </div>
}

function Map(props) {
  return (
    <div className="Map" style={{
      position: 'relative',
      top: '0px',
      left: '0px',
      width: '1208px',
      // height: '400px',
      backgroundColor: 'grey',
      border: '4px solid white',
    }}>
      {
        props.tiles.map((row, index) => <MapRow tiles={row} key={index} />)
      }
    </div>
  )
}

export default Map