import './App.css';
import { ChatUI } from './components/ChatUI';
import { useState } from 'react';
import type { RefObject } from 'react';

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
  userInfo?: User;
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
  onSubmit?: (message: string) => void;
  placeholder: string;
  customSubmitIcon?: React.ReactElement;
}

interface ChatConversationProps {
  conversations: Conversations;
  isQuerying: boolean;
  chatConversationsContainerRef: RefObject<HTMLDivElement | null>;
}

interface ChatMessageProps {
  message: Message;
}

const TEST_USER_INFO = { firstName: 'Test', lastName: 'User' };

function App() {
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [chatConversation, setChatConversations] = useState<Conversations>({
    conversation: [
      { id: '1', content: 'This is test 1.', role: 'system', userInfo: TEST_USER_INFO },
      { id: '2', content: 'This is test 2.', role: 'user' },
      { id: '3', content: 'This is test 3.', role: 'assistant' },
    ],
  });

  const handleSubmit = (value: string) => {
    setIsQuerying(true);
    setChatConversations((prevState) => ({
      conversation: [
        ...prevState.conversation,
        { id: (prevState.conversation.length + 1).toString(), role: 'user', content: value },
      ],
    }));

    setTimeout(() => {
      setIsQuerying(false);
      setChatConversations((prevState) => ({
        conversation: [
          ...prevState.conversation,
          {
            id: (prevState.conversation.length + 1).toString(),
            role: 'assistant',
            content: 'This is a sample chat bot response.',
          },
        ],
      }));
    }, 3000);
  };

  return (
    <>
      <ChatUI
        onSubmit={handleSubmit}
        placeholder="Placeholder"
        isQuerying={isQuerying}
        disabled={isQuerying}
        conversations={chatConversation}
      />
    </>
  );
}

export default App;
