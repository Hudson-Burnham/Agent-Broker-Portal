/// <reference types="vite/client" />
type Message = {
    text: string;
    attachment?: any[]
    sender: User;
    chatId: Chat
    createdAt?: string
}
type Chat = {
  _id: string;
  name: string;
  profileImg: string;
  messages: Message[]
}
type User = {
    _id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    profileImage: string;
    firstLogin: any;
}
type State = {
    isUserLoggedIn: boolean;
    user: User | null
  };
  
  type Action = {
    type: string;
    payload: any;
  };