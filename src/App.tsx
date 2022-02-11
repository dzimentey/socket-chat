import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./store";
import {createConnectionTC, destroyConnectionTC, sendMessageTC, setClientNameTC, typingMessageTC} from "./chat-reducer";


function App() {

    const dispatch = useDispatch()
    const messages = useSelector<RootStateType, Array<any>>(state => state.chat.messages)
    const typingUsers = useSelector<RootStateType, Array<any>>(state => state.chat.typingUsers)

    useEffect(() => {
      dispatch(createConnectionTC()) // acts after a component will be rendered
        return () => {
          dispatch(destroyConnectionTC()) // acts when a component will died
        }
    }, [])


    //const [messages, setMessages] = useState<Array<any>>([])

    const [text, setText] = useState("")
    const [name, setName] = useState("")
    const [autoscroll, setAutoScroll] = useState<boolean>(true)
    const [lastScrollTop, setLastScrollTop] = useState(0)

    useEffect(() => {
        messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    const messagesAnchorRef = useRef<HTMLDivElement>(null)

    return (
        <div className={'App'}>
            <div style={{
                border: '1px solid black', padding: '10px', width: '300px', height: '300px', overflow: 'scroll',
                overflowX: 'hidden'
            }} onScroll={(e) => {
                setLastScrollTop(e.currentTarget.scrollTop)
                if (e.currentTarget.scrollTop > lastScrollTop) {
                    setAutoScroll(true)
                } else {
                    setAutoScroll(false)
                }
            }}>
                {messages.map((m: any) => {
                    return <div key={m.id}>
                        <b>{m.user.name}:</b> {m.message}
                        <hr/>
                    </div>
                })}

                {typingUsers.map((u: any) => {
                    return <div key={u.id}>
                        <b>{u.name}:</b> ...is typing
                    </div>
                })}

                <div ref={messagesAnchorRef}></div>
            </div>

            <div>
                <input value={name} onChange={(e) => setName(e.currentTarget.value)}
                       placeholder={'type your name here'}
                />
                <button onClick={() => {
                    dispatch(setClientNameTC(name))
                    //socket.emit('client-name-sent', name);
                }}>set Name
                </button>
            </div>
            <div>
                <textarea value={text} onChange={(e) => setText(e.currentTarget.value)}
                          placeholder={'your message'} onKeyPress={() => dispatch( typingMessageTC() )}
                >

                </textarea>
                <button onClick={() => {
                    //socket.emit('message-sent', text);
                   dispatch( sendMessageTC(text))
                    setText('');
                }}>Send
                </button>
            </div>
        </div>
    )
}

export default App;
