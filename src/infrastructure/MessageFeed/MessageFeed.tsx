import { useEffect, useRef } from 'react'
import { useMessageContext } from "infrastructure/Contexts/MessageContext"

const MessageFeed = () => {
  const { messages } = useMessageContext()
  const box = useRef<any>(null);

  useEffect(() => {
    if (!box || !box.current || !box.current.lastElementChild) return
    box.current.lastElementChild.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth"
    });
  }, [messages])

  return (
    <div
      className='overflow-y-scroll grow'
      ref={box}
    >
      {messages.map(({ user, text }, i) => {
        // todo: prevent message sent by user to exceed outside the box 
        return (
          <div className="px-4 py-2 hover:bg-stone-700 w-84 whitespace-pre-wrap" key={i}>
            <span className="whitespace-normal text-white"><em style={{ color: `${user.color}` }}>{user.username} : </em>{text}</span>
          </div>
        );
      })}
    </div>
  )
}

export default MessageFeed