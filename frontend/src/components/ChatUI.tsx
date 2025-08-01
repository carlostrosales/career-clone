import React from 'react';

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

export const ChatUI = ({
  isQuerying,
  onSubmit,
  placeholder,
  disabled,
  conversations,
  customSubmitIcon,
}: ChatUIProps): React.ReactElement => {
  console.log(isQuerying, onSubmit, placeholder, disabled, conversations, customSubmitIcon);
  return <div></div>;
};
