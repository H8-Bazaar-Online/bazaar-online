import Player from '../player/index'
import Map from '../map/index'
import { tiles } from '../map/tiles'
import Socket from '../../pages/Socket'
import Booth from '../Booth'
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
function World() {
  
  
  const [players, setPlayers] = useState([])
  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3001")
    socketRef.current.emit("ready", (localStorage.name))
    socketRef.current.on('ready', ({ state }) => {
      // console.log(state);
      let playerss = [...players]
      setPlayers([...playerss, state])
    })
			return () => socketRef.current.disconnect()
  }, [])

  return (
    <>
      <div style={{
        position: 'relative',
        width: '800px',
        height: '400px',
        margin: '20px auto'
      }}>
        <Map tiles={tiles} />
        <Player skin="m1" player={players}/>
        {/* <Player skin="m2" /> */}
        <Socket />
        {/* <Booth /> */}
      </div>
    </>
  )
}

export default World