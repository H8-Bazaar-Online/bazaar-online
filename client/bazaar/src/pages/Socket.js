import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import '../App.css'

function Socket() {
	const [state, setState] = useState({ message: " ", name: localStorage.name })
	const [chat, setChat] = useState([])

	const { socketConnect } = useSelector((state) => state.socketConnect)
	// console.log(chat, '<<<<<<<<<< CHAT KELUARLAHH');
	useEffect(() => {
		if (socketConnect) {
			// console.log('yeyyy');
			socketConnect.on("message", ({ name, message }) => {
				// console.log('YEYEYEYEYEYEYEYEYEYEYYEEY');
				// console.log(name, message, '<<<<<<<<<< NAME MESSAGE');
				// setChat([ ...chat, { name, message } ])
				setChat((chat) => chat.concat({ name, message }));
				// setPlayers((player) => player.concat(state));
			})
		}
		// return () => socketConnect.disconnect()
	}, [socketConnect])

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		document.getElementById('outlined-multiline-static').blur()
		const { name, message } = state
		socketConnect.emit("message", { name: localStorage.name, message })
		e.preventDefault()
		// console.log(state, '<<<<<<<<<<<<<< SEBELUM RESET');
		setState({ message: "", name })
		// console.log(state, '<<<<<<<<<<<<<< SESUDAH RESET');
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}

	return (
		<div className="card chat-container">
			<div className="card-header render-chat">
				<h3>Public Chat</h3>
			</div>
			<div className="card-body">
				{renderChat()}
			</div>
			<div className="card-footer">
				<form onSubmit={onMessageSubmit}>
					{/* <div className="name-field">
                <TextField name="name" onChange={(e) => setState({...state, name: e.target.value})} value={state.name} label="Name" />
            </div> */}
					<input
						name="message"
						onChange={(e) => {
							console.log(e.target.value);
							onTextChange(e)
						}}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
					<button>Send</button>
				</form>
			</div>
		</div>
	)
}

export default Socket

