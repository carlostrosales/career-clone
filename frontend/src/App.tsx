import './App.css';
import { ChatUI } from './components/ChatUI';

type MessageRole = 'system' | 'assistant' | 'user';

/* defining data types */
type User = {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
};

type Message = {
  id: string;
  content: string;
  role: MessageRole;
  userInfo?: string;
};

type Conversations = {
  conversation: Array<Message>;
};

/* defining ui component interfaces */

interface ChatUIProps {
  isQuerying: boolean;
  onSubmit: (message: string) => void;
  placeholder: string;
  disabled: boolean;
  conversations: Conversations;
  customSubmitIcon?: React.ReactElement;
}

interface ChatInputProps {
  disabled: boolean;
  onSubmit: (message: string) => void;
  placeholder: string;
  customSubmitIcon?: React.ReactElement;
}

interface ChatConversationProps {
  conversations: Conversations;
  isQuerying: boolean;
}

interface ChatMessageProps {
  message: Message;
}

const arrayOfMessageObjects: Conversations = {
  conversation: [
    { id: '1', content: 'This is test 1.', role: 'system' },
    { id: '2', content: 'This is test 2.', role: 'user' },
    { id: '3', content: 'This is test 3.', role: 'assistant' },
  ],
};

function App() {
  return (
    <>
      <ChatUI isQuerying={false} disabled={false} conversations={arrayOfMessageObjects} />
    </>
  );
}

export default App;
