import React, {useEffect, useState} from 'react';
import './App.css';
import {io} from "socket.io-client";

const socket = io('http://localhost:3009');

function App() {

    useEffect( () => {
        socket.on('got-init-messages', (initMessages) => {
            setMessages(initMessages)
        } )
    }, [])

    const [messages, setMessages] = useState([])

    const [message, setMessage] = useState("HI-hi")

    return (
        <div className={'App'}>
            <div style={{border: '1px solid black', padding: '10px',width: '300px', height: '300px', overflow: 'scroll'}}>
                {messages.map((m: any) => {
                 return <div key={m.id}>
                     <b>{m.user.name}:</b> {m.message}
                     <hr/>
                 </div>
                })}
            </div>
            <div>
                <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}></textarea>
                <button onClick={()=>{socket.emit('message-sent', message);
                                        setMessage('');
                }}>Send</button>
            </div>
        </div>
    )
}

export default App;
