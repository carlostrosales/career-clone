import React from 'react';
import { ChatConversation } from './ChatConversation';
import { ChatInput } from './ChatInput';
import { useRef } from 'react';
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

export const ChatUI = ({
  isQuerying,
  onSubmit,
  placeholder,
  disabled,
  conversations,
  customSubmitIcon,
}: ChatUIProps): React.ReactElement => {
  const chatConversationsContainerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-col h-screen">
      <div
        ref={chatConversationsContainerRef}
        className="flex-1 w-full justify-center overflow-y-auto pb-8"
        style={{ minHeight: '200px' }}
      >
        <ChatConversation
          conversations={conversations}
          isQuerying={isQuerying}
          chatConversationsContainerRef={chatConversationsContainerRef}
        />
      </div>
      <div className="w-full py-4 bg-base-100">
        <ChatInput disabled={disabled} placeholder={placeholder} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
