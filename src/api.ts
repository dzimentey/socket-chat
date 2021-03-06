import {io, Socket,} from "socket.io-client";

//export const socket = io('http://localhost:3009');


export const api = {
    socket: null as null | Socket,
    createConnection() {
        this.socket = io('http://localhost:3009')
    },
    subscribe(initMessageHandler: (messages: any) => void,
              newMessageSentHandler: (message: string) => void,
              userTypingHandler: (user: any) => void,
              ) {
        this.socket?.on('got-init-messages', initMessageHandler)
        this.socket?.on('new-message-sent', newMessageSentHandler)
        this.socket?.on('user-typing', userTypingHandler)
    },
    destroyConnection() {
        this.socket?.disconnect()
        this.socket = null
    },
    sendName(name: string) {
        this.socket?.emit('client-name-sent', name)
    },
    sendTextMessage(text: string) {
        this.socket?.emit('message-sent', text)
    },
    typingMessage() {
        this.socket?.emit('client-typing')
    }

}