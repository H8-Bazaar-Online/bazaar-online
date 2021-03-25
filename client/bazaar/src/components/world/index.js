import Player from '../player/index'
import Map from '../map/index'
import { tiles } from '../map/tiles'
import Socket from '../../pages/Socket'
import Booth from '../Booth'
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { setSocketPlayer, setSocketPlayers, setSocketUpdatePlayers } from '../../store/action'
import Inventory from '../inventory/index'
import History from '../History'
import AudioPlayer from '../audio'
import { useHistory } from 'react-router'

function World() {
  

  const dispatch = useDispatch()

  const {socketConnect, player, players, updatePlayers} = useSelector((state) => state.socketConnect)
  const [clonePlayers, setClonePlayers] = useState(players)
  const [localPlayers, setLocalPlayers] = useState([])

  useEffect(() => {
    if (socketConnect) {
      socketConnect.emit('ready', {name: localStorage.name, position: {x: 4, y: 170}, data: { x: 0, y: 0, h: 48, w: 32 }})
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




  // useEffect(() => {
  //   setClonePlayers(players)
  // }, [players])

  // useEffect(() => {
  //   if (socketConnect) {
      
  //     // socketConnect.emit('ready', (localStorage.name))
  //     socketConnect.emit('ready', localStorage.name)
  //     socketConnect.on('ready', ({ state }) => {
  //       // setPlayers((player) => player.concat(state));
  //       dispatch(setSocketPlayer(state))
        
  //     })
      // socketConnect.on('playerPos', (state) => {
      //   // setPlayers((player) => player.concat(state));
        
      // })
  //     // socketConnect.on('playerDisconnected', name => {
  //     //   // const allPlayers = this.allPlayers.getChildren()
  //     //   setClonePlayers((player) => [...players, player])
  //     //   clonePlayers.forEach(player => {
  //     //     if(player.name === name){
  //     //       return player.disconnect()
  //     //     }
  //     //   })
  //     // })
  //   }
  // }, [socketConnect, dispatch])

  // useEffect(() => {
  //   if (socketConnect){
  //     socketConnect.emit('update', player)

  //   }
  // }, [socketConnect])

  useEffect(() => {

    if (updatePlayers) {
      setLocalPlayers(updatePlayers)
    }

  }, [updatePlayers, players]) 

  const history = useHistory()

  // useEffect(() => {
  //   if (window.location.pathname === '/register') {
  //     history.push('/register')
  //   } else {
  //     if (localStorage.access_token === 'undefined' || !localStorage.access_token) {
  //       history.push('/login')
  //     } else {
  //       history.push('/game')
  //     }
  //   }
  // }, [history])

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
            //  <Player key={index} skin="m1" player={JSON.stringifyplayer}/>
          ))
        }
        {/* <Player skin="m2" /> */}
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