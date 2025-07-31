import { useState } from 'react'
import './App.css'

/* defining data types */
type User = {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

type Message = {
  id: string;
  content: string;
  role: User;
  userInfo?: string;
}

type Conversations = {
  conversation: Array<Message>;
}

/* defining ui component interfaces */

interface ChatUIProps {
  isQuerying: boolean;
  onSubmit: string;
  placeholder: string;
  disabled: boolean;
  conversations: Conversations;
  customSubmitIcon?: React.ReactElement;
}

interface ChatInputProps {
  disabled: boolean;
  onSubmit: string;
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




function App() {

  return (
    <>

    </>
  )
}

export default App
