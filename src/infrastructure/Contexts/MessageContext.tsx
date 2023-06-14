import { Socket } from 'socket.io-client'
import { useContext, useState, createContext, useEffect } from 'react'
import connectSocket from 'domains/Socket/connexion'
import { Message } from 'domains/Message/interfaces'
import { sendMessage } from 'domains/Message/useCases'

interface MessageContext {
  messages: Message[]
  pendingMessageCount: number,
  sendNewMessage: (value: string) => void,
  messageFlowIsPaused: boolean,
  pauseMessageFlow: () => void,
  resumeMessageFlow: () => void
}

export const MessageContext = createContext<MessageContext>({
  messages: [],
  pendingMessageCount: 0,
  sendNewMessage: () => {},
  messageFlowIsPaused: false,
  pauseMessageFlow: () => {},
  resumeMessageFlow: () => {}
})

function useMessageStateProvider() {
  const [messages, setMessages] = useState<Message[]>([])
  const [socket, setSocket] = useState<Socket|null>(null)
  const [messageFlowIsPaused, setMessageFlowIsPaused] = useState<boolean>(false)
  const [pendingMessageCount, setPendingMessageCount] = useState<number>(0)

  const pauseMessageFlow = () => setMessageFlowIsPaused(true)
  const resumeMessageFlow = () => setMessageFlowIsPaused(false)
  const refreshPendingMessageCount = () => setPendingMessageCount(0)

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
    if(messageFlowIsPaused == false) {
      refreshPendingMessageCount()
    }
  }, [messageFlowIsPaused])

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

  useEffect(() => {
    if(messageFlowIsPaused) {
      setPendingMessageCount(prevCount => prevCount + 1)
    }
  }, [messages])

  return {
    messages,
    sendNewMessage,
    messageFlowIsPaused,
    pauseMessageFlow,
    resumeMessageFlow,
    pendingMessageCount
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