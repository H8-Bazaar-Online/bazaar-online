import Player from '../player/index'
import Map from '../map/index'
import { tiles } from '../map/tiles'
import Socket from '../../pages/Socket'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSocketPlayers, setSocketUpdatePlayers } from '../../store/action'
import Inventory from '../inventory/index'
import History from '../History'
import AudioPlayer from '../audio'

function World() {
  const dispatch = useDispatch()
  const {socketConnect, players, updatePlayers} = useSelector((state) => state.socketConnect)
  const [clonePlayers, setClonePlayers] = useState(players)
  const [localPlayers, setLocalPlayers] = useState([])

  useEffect(() => {
    if (socketConnect) {
      socketConnect.emit('ready', {name: localStorage.name, character: localPlayers.character, position: {x: 4, y: 170}, data: { x: 0, y: 0, h: 48, w: 32 }})
      socketConnect.on('playerJoin', players => {
        dispatch(setSocketPlayers(players))
        dispatch(setSocketUpdatePlayers(players))
        setClonePlayers(players)
      })

      socketConnect.on('playerPos', (state) => {
        // setPlayers((player) => player.concat(state));
        dispatch(setSocketUpdatePlayers(state))
      })

    }
  }, [socketConnect])

  useEffect(() => {
    if (updatePlayers) {
      setLocalPlayers(updatePlayers)
    }
  }, [updatePlayers, players]) 

  return (
    <>
      <div style={{
        position: 'relative',
        width: '1200px',
        height: '608px',
        margin: '20px auto'
      }}>
        <Map tiles={tiles} />
        {
          localPlayers.map((player, index) => (
            <Player key={index} skin="char1" player={player} updatePlayer={player}/>
          ))
        }
        {/* <Player skin="m2" /> */}
          <div className="logo-bazaar text-success bg-dark">
            <div className="text-center" style={{paddingTop:31, fontSize:20}}>
              Virtual <br/> Bazaar
            </div>
          </div>
        <Socket />
        {/* <Booth /> */}
        <Inventory/>
        <AudioPlayer url={'https://opengameart.org/sites/default/files/Caketown%201.mp3'} />
        <History />
      </div>
    </>
  )
}

export default World