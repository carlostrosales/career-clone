import React from 'react';
import { ChatMessage } from './ChatMessage';
import { Loading } from 'react-daisyui';
import type { RefObject } from 'react';
import { useEffect } from 'react';

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

export const ChatConversation = ({
  conversations,
  isQuerying,
  chatConversationsContainerRef,
}: ChatConversationProps): React.ReactElement => {
  useEffect(() => {
    const chatConversationsContainer = chatConversationsContainerRef?.current;
    if (chatConversationsContainer) {
      setTimeout(() => {
        chatConversationsContainer.scrollTo(0, chatConversationsContainer.scrollHeight);
      }, 10);
    }
  }, [conversations.conversation]);

  return (
    <div className="w-2/3">
      {conversations &&
        conversations.conversation.map((conversation: Message) => <ChatMessage message={conversation} />)}
      {isQuerying && <Loading className="mt-4 ml-16" variant="dots" size="lg" />}
    </div>
  );
};
