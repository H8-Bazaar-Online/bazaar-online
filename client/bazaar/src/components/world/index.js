import Player from '../player/index'
import Map from '../map/index'
import { tiles } from '../map/tiles'
import Socket from '../../pages/Socket'
import Booth from '../Booth'
import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { setSocketPlayer, setSocketPlayers, setSocketUpdatePlayers } from '../../store/action'
function World() {
  

  const dispatch = useDispatch()

  const {socketConnect, player, players, updatePlayers} = useSelector((state) => state.socketConnect)
  const [clonePlayers, setClonePlayers] = useState(players)
  // console.log(players, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< PLAYERS');
  // console.log(clonePlayers, '<<<<<<<< CLONEEEEEEE PLAYERS YEE');

  useEffect(() => {
    if (socketConnect) {
      socketConnect.emit('ready', {name: localStorage.name, position: {x: 4, y: 164}})
      socketConnect.on('playerJoin', players => {
        dispatch(setSocketPlayers(players))
        setClonePlayers(players)
      })

      socketConnect.on('playerPos', (state) => {
        // setPlayers((player) => player.concat(state));
        dispatch(setSocketUpdatePlayers(state))
        // console.log(state, '|||||||||||||||||||||');
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
      //   // console.log('============================');
      //   // setPlayers((player) => player.concat(state));
      //   // console.log(state, '<<<<<<<<<<<<<<<<<< DAPET STATE PLAYER POSE ???');
        
      // })
  //     // socketConnect.on('playerDisconnected', name => {
  //     //   console.log(players, '<<<<<<<<<<<<<<<<<<<<< PLAUER');
  //     //   // const allPlayers = this.allPlayers.getChildren()
  //     //   setClonePlayers((player) => [...players, player])
  //     //   console.log(clonePlayers, '>>>>>>>>>>>>>>  PLAYERRSS <<<<<<<<<<<<<<<<< ============');
  //     //   clonePlayers.forEach(player => {
  //     //     console.log('TESSSSS MASUK LUU');
  //     //     console.log(player, '<<<<<<<<<<<<<<< ============ PLAYER');
  //     //     console.log(player.name, '=================>>>>>>>>>>>> NAME PLAYER');
  //     //     if(player.name === name){
  //     //       console.log('MASUK SINNIII');
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
    console.log(players, '<<<<<<<<<<<<<<<<< USE EFFECT PLAYERS');
    console.log(updatePlayers, 'TERRRRUPDATEEE');
  }, [updatePlayers, players])
  // console.log(connectSocket, '<<<<<<<<< TES');
  // console.log(players, '<<<<<<<<< PLAYERS');

  return (
    <>
      <div style={{
        position: 'relative',
        width: '800px',
        height: '400px',
        margin: '20px auto'
      }}>
        <Map tiles={tiles} />
        {
          players.map((player, index) => (
             <Player key={index} skin="m1" player={player} updatePlayer={updatePlayers}/>
            //  <Player key={index} skin="m1" player={JSON.stringifyplayer}/>
          ))
        }
        {/* <Player skin="m2" /> */}
        <Socket />
        {/* <Booth /> */}
      </div>
    </>
  )
}

export default World