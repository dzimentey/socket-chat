import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {io} from "socket.io-client";

const socket = io('http://localhost:3009');

function App() {

    useEffect( () => {
        socket.on('got-init-messages', (initMessages) => {
            setMessages(initMessages)
        } )
        socket.on('new-message-sent', (messageItem) => {
            setMessages((messages) => [...messages, messageItem])
        })
    }, [])


    const [messages, setMessages] = useState <Array<any>>([])

    const [text, setText] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    },[messages])

    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    return (
        <div className={'App'}>
            <div style={{border: '1px solid black', padding: '10px',width: '300px', height: '300px', overflow: 'scroll',
                overflowX:'hidden'}}>
                {messages.map((m: any) => {
                 return <div key={m.id}>
                     <b>{m.user.name}:</b> {m.message}
                     <hr/>
                 </div>
                })}
                <div ref={messagesAnchorRef}></div>
            </div>

            <div>
                <input value={name} onChange={(e) => setName(e.currentTarget.value)}
                        placeholder={'type your name here'}
                />
                <button onClick={()=>{socket.emit('client-name-sent', name);
                }}>set Name</button>
            </div>
            <div>
                <textarea value={text} onChange={(e) => setText(e.currentTarget.value)}
                          placeholder={'your message'}>

                </textarea>
                <button onClick={()=>{socket.emit('message-sent', text);
                                        setText('');
                }}>Send</button>
            </div>
        </div>
    )
}

export default App;
