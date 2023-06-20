import { useEffect, useRef } from 'react'
import { useMessageContext } from "infrastructure/Contexts/MessageContext"
import PauseButton from 'infrastructure/PauseButton/PauseButton'

const MessageFeed = () => {
  const { messages, messageFlowIsPaused, pauseMessageFlow, resumeMessageFlow } = useMessageContext()
  const parentBox = useRef<any>(null)
  const messageBox = useRef<any>(null);

  const handleMouseWheel = () => {
    const { scrollTop, scrollHeight, clientHeight } = parentBox.current
    const scrollPosition = scrollHeight - scrollTop - clientHeight
    if(scrollPosition > 0) {
      pauseMessageFlow()
    } else {
      resumeMessageFlow()
    }
  }

  const scrollToBottom = () => {
    messageBox.current.lastElementChild.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth"
    });
  }

  const handlePauseButtonClick = () => {
    scrollToBottom()
    resumeMessageFlow()
  }

  useEffect(() => {
    if (!messageBox || !messageBox.current || !messageBox.current.lastElementChild) return

    if(messageFlowIsPaused === false) {
      scrollToBottom()
    }

  }, [messages])

  return (
    <div 
      className='relative bg-stone-800 overflow-y-scroll grow'
      ref={parentBox}
      onWheel={handleMouseWheel}
    >
      <div 
        ref={messageBox}
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
      {
        messageFlowIsPaused && (
          <div className='sticky p-4 grid justify-items-center w-full bottom-0'>
            <PauseButton onClick={handlePauseButtonClick}/>
          </div>
        )
      }
    </div>
  )
}

export default MessageFeed