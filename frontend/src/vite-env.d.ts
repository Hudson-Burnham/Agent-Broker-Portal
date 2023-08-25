/// <reference types="vite/client" />
type Message = {
    text: string;
    attachment?: any[]
    sender: User;
    chatId: Chat
}
type Chat = {
  _id: string;
  name: string;
  profileImg: string;
  messages: Message[]
}
type User = {
    _id: string;
    name: string;
    email: string;
    profileImage: string
}
type State = {
    isUserLoggedIn: boolean;
    user: User | null
  };
  
  type Action = {
    type: string;
    payload: any;
  };