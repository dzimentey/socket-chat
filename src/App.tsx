import React, {useState} from 'react';
import './App.css';


function App() {

    const [messages, setMessages] = useState([

        {message: 'hello', id: '1234567', user: {id: '123456', name: 'Kolia'}},
        {message: 'hello guys', id: '1234568', user: {id: '123457', name: 'Fedia'}},

    ])

    return (
        <div className={'App'}>
            <div style={{border: '1px solid black', padding: '10px',width: '300px', height: '300px', overflow: 'scroll'}}>
                {messages.map(m => {
                 return <div>
                     <b>{m.user.name}:</b> {m.message}
                     <hr/>
                 </div>
                })}
            </div>
            <div>
                <textarea></textarea>
                <button>Send</button>
            </div>
        </div>
    )
}

export default App;
