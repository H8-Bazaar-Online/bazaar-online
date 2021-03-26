import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import '../App.css'

function Socket() {
	const [state, setState] = useState({ message: " ", name: localStorage.name })
	const [chat, setChat] = useState([])

	const { socketConnect } = useSelector((state) => state.socketConnect)
	useEffect(() => {
		if (socketConnect) {
			socketConnect.on("message", ({ name, message }) => {
				setChat((chat) => chat.concat({ name, message }))
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
		setState({ message: "", name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3 style={{fontSize:13}}>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}

	return (
		<div className="card chat-container">
			<div className="card-header render-chat">
				<p className="text-white mb-0">Public Chat</p>
			</div>
			<div className="card-body">
				{renderChat()}
			</div>
			<div className="card-footer ">
				<form onSubmit={onMessageSubmit}>
						<div className="d-flex items-center">
							
					<input
						name="message"
						onChange={(e) => {
							console.log(e.target.value);
							onTextChange(e)
						}}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						className="nes-input"
						label="Message"
					/>
                {/* <input type="email" id="name_field" name='email' className="nes-input is-dark"/> */}

					<button style={{height:50, paddingRight:10}} className="nes-btn"><i className="fas fa-paper-plane text-dark"></i></button>
						</div>

				</form>
			</div>
		</div>
	)
}

export default Socket

