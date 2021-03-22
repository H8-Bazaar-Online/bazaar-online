import TextField from '@material-ui/core/TextField'
import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import '../App.css'

function Socket() {
	const [ state, setState ] = useState({ message: " ", name: "" })
	const [ chat, setChat ] = useState([])
    
	const socketRef = useRef()

	useEffect(() => {
			socketRef.current = io.connect("http://localhost:3001")
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socketRef.current.disconnect()
		},[ chat ])

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		document.getElementById('outlined-multiline-static').blur()
		const { name, message } = state
		socketRef.current.emit("message", { name: localStorage.name, message })
		e.preventDefault()
		setState({ message: "", name })
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
    <div className="card">
			<div className="render-chat">
        <h1>Chat Log</h1>
            {renderChat()}
      </div>
        <form onSubmit={onMessageSubmit}>
            <h1>Messenger</h1>
            {/* <div className="name-field">
                <TextField name="name" onChange={(e) => setState({...state, name: e.target.value})} value={state.name} label="Name" />
            </div> */}
            <div>
                <TextField
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
            </div>
            <button>Send Message</button>
        </form>
    </div>
	)
}

export default Socket

