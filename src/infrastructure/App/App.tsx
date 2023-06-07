import { useEffect, useState, useRef } from "react"
import socket from "domains/Socket/connexion"
import { Message } from "domains/Message/interfaces"
import { sendMessage } from "domains/Message/useCases"

const App = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [message, setMessage] = useState<string|null>(null)
  const box = useRef<any>(null);

  const addNewMessage = (message: Message) =>
    setMessages((messages) => [...messages, message])

  useEffect(() => {
    if (!box || !box.current) return
    /*
    box.current.lastElementChild.scrollIntoView({
      block: "end",
      inline: "nearest",
      behavior: "smooth"
    });
    */
  }, [messages])

  useEffect(() => {
  
    socket.on("new-message", (message) => {
      addNewMessage(message)
    })

    return () => {
      socket.close();
    };
  }, []);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setMessage(value);
  };

  const handleMessageSend = () => {
    if(null !== message) {
      sendMessage({
        type: "text",
        text: message,
        user: {
          username: "Toto",
          color: "#ff0000"
        }
      })
    }
  };

  return (
    <div>
      <div
        style={{
          height: "100px",
          overflow: "scroll"
        }}
        ref={box}
      >
        {messages.map(({ user, text }, i) => {
          return (
            <div key={i}>
              <span style={{ color: `${user.color}` }}>{user.username}</span>:{" "}
              {text}
            </div>
          );
        })}
      </div>
      <div>
        <input type="text" onChange={handleChange} />{" "}
        <button onClick={handleMessageSend}>Envoyer</button>
      </div>
    </div>
  );
};

export default App;
