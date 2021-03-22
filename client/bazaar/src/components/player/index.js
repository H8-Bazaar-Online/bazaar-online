import Actor from '../actor/index'
import useKeyPress from '../hooks/use-key-press/index'
import useWalk from '../hooks/use-walk'
import { tiles } from '../map/tiles'

function Player({ skin }) {
  const { dir, step, walk, position } = useWalk(3)
  const data = {
    h: 32,
    w: 32
  }

  useKeyPress((e) => {
    if (e.key === 'Enter') {
      let arrayX = Math.round((position.x - 4) / 40)
      let arrayY = Math.round((position.y - 24) / 40)
      if (tiles[arrayY - 1][arrayX] === 9) {
        return console.log('ACTION')
      } else {
        return console.log('no valid action is within range')
      }
    } else {
      walk(e.key.replace("Arrow", "").toLowerCase())
      e.preventDefault()
    }



  })
  return <Actor sprite={`./img/${skin}.png`} data={data} step={step} dir={dir} position={position} />
}

export default Player;
