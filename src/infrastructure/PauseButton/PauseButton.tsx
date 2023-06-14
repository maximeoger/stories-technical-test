import { useRef, useState } from 'react'
import { useMessageContext } from 'infrastructure/Contexts/MessageContext'

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const PauseButton = ({ onClick }: Props) => {
  const { pendingMessageCount } = useMessageContext()
  const [hover, setHover] = useState(false)
  const button = useRef(null)

  const handleMouseEnter = () => setHover(true)

  const handleMouseLeave = () => setHover(false)

  const setButtonTextContent = () => {
    if(pendingMessageCount > 10) {
      return `Plus de ${pendingMessageCount} nouveaux messages`
    }
    return 'Voir les nouveaux messages'
  }

  return (
    <button 
      ref={button} 
      className='text-slate-200 bg-stone-900 p-2'
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {
        hover ?  setButtonTextContent() : 'Chat mis en pause à cause du défilement'
      }
    </button>
  )
}

export default PauseButton