import { Socket } from 'socket.io-client'
import { useContext, useState, createContext, useEffect } from 'react'
import connectSocket from 'domains/Socket/connexion'
import { Message } from 'domains/Message/interfaces'
import { sendMessage } from 'domains/Message/useCases'

interface MessageContext {
  messages: Message[]
  sendNewMessage: (value: string) => void
}

export const MessageContext = createContext<MessageContext>({
  messages: [],
  sendNewMessage: () => {}
})

function useMessageStateProvider() {
  const [messages, setMessages] = useState<Message[]>([])
  const [socket, setSocket] = useState<Socket|null>(null)

  const addNewMessage = (message: Message) =>
  setMessages((messages) => [...messages, message])

  const sendNewMessage = (value: string) => {
    if(!socket) return 
    sendMessage(socket, {
      type: "text",
      text: value,
      user: {
        username: "Toto",
        color: "#ff0000"
      }
    })
  }

  useEffect(() => {
    const _socket = connectSocket()

    _socket.on("new-message", (message) => {
      addNewMessage(message)
    })

    setSocket(_socket)

    return () => {
      _socket.close()
    }
  }, [])


  return {
    messages,
    sendNewMessage
  }
}

export const MessageProvider = ({children} : any) => {
  const value = useMessageStateProvider()

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>)
}

export const useMessageContext = () => useContext(MessageContext)