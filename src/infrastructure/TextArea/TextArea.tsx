import { useMessageContext } from 'infrastructure/Contexts/MessageContext'
import { useRef, useState, useEffect } from 'react'

const TextArea = () => {
  const { sendNewMessage } = useMessageContext()
  const [value , setValue] = useState<string>('')
  const input = useRef(null)

  useEffect(() => {
    // used to compute new height of textarea whenever text is added
    if(!input || ! input.current) return
    if(value.trim() == "") {
      input.current.style.height = "40px"
    }
    input.current.style.height = input.current.scrollHeight + "px"
  }, [value])

  const handleMessageSend = (e: React.KeyboardEvent) => {
    if(e.key == "Enter" && value !== '') {
      e.preventDefault()
      sendNewMessage(value)
      setValue('')
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  return (
    // Todo: handle thicker border size with box-shadow when the textarea is focused
    <textarea 
      className="box-border caret-white resize-none w-full border border-gray-600 h-10 rounded p-2 bg-stone-900 text-white focus:border-violet-900 focus:shadow-violet-900  focus:outline-none overflow-hidden"
      onChange={handleChange}
      onKeyDown={handleMessageSend}
      value={value}
      ref={input}
      placeholder="Envoyer un message" 
    />
  )
}

export default TextArea