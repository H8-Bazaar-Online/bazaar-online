import Actor from '../actor/index'
import useKeyPress from '../hooks/use-key-press/index'
import useWalk from '../hooks/use-walk'
import { tiles } from '../map/tiles'
import { useHistory } from 'react-router-dom'

function Player({ skin, player }) {
  const { dir, step, walk, position } = useWalk(3, player)
  const data = {
    h: 32,
    w: 32
  }

  const history = useHistory()  

  useKeyPress((e) => {
    if (e.keyCode === 13) {
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
    } else if (e.keyCode === 32) {
      document.getElementById('outlined-multiline-static').focus()
    } else if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
      e.preventDefault()
      const direction = e.key.replace("Arrow", "").toLowerCase()
      walk(direction)
    }



  })
  return <Actor sprite={`./img/${skin}.png`} data={data} step={step} dir={dir} position={position} />
}

export default Player;
