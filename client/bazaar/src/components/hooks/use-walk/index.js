import { useState } from 'react'
import { tiles } from '../../map/tiles'
import { useSelector } from 'react-redux'


function useWalk(maxSteps, player, updatePlayer) {
  // console.log(player, ')))))))))))))');
  const [dir, setDir] = useState(0)
  const [step, setStep] = useState(0)
  const [position, setPosition] = useState({ x: updatePlayer.position.x, y: updatePlayer.position.y })

  const { socketConnect } = useSelector(state => state.socketConnect)

  console.log(updatePlayer, '=>>>>>>>');
  const directions = {
    down: 0,
    left: 1,
    right: 2,
    up: 3
  }
  //stepsize value came from half size of MapTile
  const stepSize = 10

  const modifier = {
    down: { x: 0, y: stepSize },
    left: { x: -stepSize, y: 0 },
    right: { x: stepSize, y: 0 },
    up: { x: 0, y: -stepSize }
  }

  function walk(dir) {
    setDir(prev => {
      if (directions[dir] === prev) move(dir)
      return directions[dir]
    })
    setStep((prev) => (prev < maxSteps - 1 ? prev + 1 : 0))
  }

  function move(dir) {
    const { id, name, position } = updatePlayer
    setPosition((prev) => {
      console.log(prev, '<<<<<<<?????????');
      const newX = prev.x + modifier[dir].x
      const newY = prev.y + modifier[dir].y
      //check the boundaries map
      if (newX < 1200 && newX >= 0 && newY < 580 && newY >= 0) {
        //check other object position
        let arrayX = Math.round((newX - 4) / 40) 
        let arrayY = Math.round((newY - 24) / 40)
        let tile = tiles[arrayY][arrayX]
        if (tile < 4) {
          socketConnect.emit('playerPos', { id, name, position: { x: prev.x + modifier[dir].x, y: prev.y + modifier[dir].y } })
          return { x: prev.x + modifier[dir].x, y: prev.y + modifier[dir].y }
        } else {
          socketConnect.emit('playerPos', { id, name, position:{ x: prev.x, y: prev.y } })
          return { x: prev.x, y: prev.y }
        }
      } else {
        socketConnect.emit('playerPos', { id, name, position:{ x: prev.x, y: prev.y } })
        return { x: prev.x, y: prev.y }
      }
    })
  }
  return {
    walk, dir, step, position
  }
}

export default useWalk