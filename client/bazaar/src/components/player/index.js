import Actor from '../actor/index'
import useKeyPress from '../hooks/use-key-press/index'
import useWalk from '../hooks/use-walk'
import { tiles } from '../map/tiles'
import { useHistory } from 'react-router-dom'

function Player({ skin }) {
  const { dir, step, walk, position } = useWalk(3)
  const data = {
    h: 32,
    w: 32
  }

  const history = useHistory()

  useKeyPress((e) => {
    if (e.key === 'Enter') {
      let arrayX = Math.round((position.x - 4) / 40)
      let arrayY = Math.round((position.y - 24) / 40)
      if (tiles[arrayY - 1][arrayX] === 9) {
        alert('Iya mau apa?')
        return console.log('ACTION')
      } if (tiles[arrayY - 1][arrayX] === 8) {
        alert('go to chat room')
        history.push('/chat')
        // return console.log('ACTION')
      } else {
        return console.log('no valid action is within range')
      }
    } else {
      e.preventDefault()
      console.log(e.key.replace("Arrow", "").toLowerCase());
      const direction = e.key.replace("Arrow", "").toLowerCase()
      if (direction === 'right' || direction === 'left' || direction === 'up' || direction === 'down') {
        walk(direction)
      } else {
        // alert('Kaya pencet yg lain2')
        console.log(e.key);
      }
    }



  })
  return <Actor sprite={`./img/${skin}.png`} data={data} step={step} dir={dir} position={position} />
}

export default Player;
