import React from 'react';
import { ChatConversation } from './ChatConversation';
import { ChatInput } from './ChatInput';

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
  onSubmit?: (message: string) => void;
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

export const ChatUI = ({
  isQuerying,
  onSubmit,
  placeholder,
  disabled,
  conversations,
  customSubmitIcon,
}: ChatUIProps): React.ReactElement => {
  console.log(isQuerying, onSubmit, placeholder, disabled, conversations, customSubmitIcon);
  return (
    <div style={{ height: 'calc(100vh - 68px)' }}>
      <div className="flex w-full justify-center overflow-y-auto pb-8" style={{ maxHeight: 'calc(100vh - 250px)' }}>
        <ChatConversation conversations={conversations} isQuerying={isQuerying} />
      </div>
      <div className="absolute bottom-12 left-0 w-full">
        <ChatInput disabled={disabled} placeholder={placeholder} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
