import { MessageProvider } from "infrastructure/Contexts/MessageContext";
import MessageFeed from "infrastructure/MessageFeed/MessageFeed"
import TextArea from 'infrastructure/TextArea/TextArea'

const App = () => {
  return (
    <MessageProvider>
      <div className="grid place-items-end bg-stone-900">
        <div className='flex flex-col border-l border-stone-700 h-screen bg-stone-800 max-w-md'>
          <MessageFeed/>
          <div className="px-4 py-2">
            <TextArea/>
          </div>
        </div>
      </div>
    </MessageProvider>
  );
};

export default App;

