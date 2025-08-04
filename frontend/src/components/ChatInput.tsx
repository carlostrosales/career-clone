import React from 'react';
import { Button, Textarea } from 'react-daisyui';
import { useRef } from 'react';

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

export const ChatInput = ({ disabled, placeholder, onSubmit }: ChatInputProps): React.ReactElement => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const TextArea = textAreaRef?.current;
    onSubmit(TextArea!.value);
  };

  return (
    <div className="flex justify-center items-center">
      <Textarea
        bordered
        className={`resize-none w-2/3 max-h-48 overflow-y-auto`}
        ref={textAreaRef}
        placeholder={placeholder}
      ></Textarea>
      <Button shape={'square'} className="absolute ml-[58%]" onClick={handleSubmit} disabled={disabled}>
        {'Submit'}
      </Button>
    </div>
  );
};
