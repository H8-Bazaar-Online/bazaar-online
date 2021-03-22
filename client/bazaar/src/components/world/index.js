import Player from '../player/index'
import Map from '../map/index'
import { tiles } from '../map/tiles'

function World() {
  return (
    <div style={{
      position: 'relative',
      width: '800px',
      height: '400px',
      margin: '20px auto'
    }}>
      <Map tiles={tiles} />
      <Player skin="m1" />
    </div>
  )
}

export default World