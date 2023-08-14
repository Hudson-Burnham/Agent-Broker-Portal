import { styled } from "@mui/material";
import Contacts from "./Contacts";
import MessageList from "./MessageList";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import NoConversation from "./NoConversation";
import { fetchAllChats, fetchChatMessage } from "../../../../axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const MessageContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "30% 70%",
  height: "100%",
  overflow: "auto",
});

function Messages() {
  const [messageList, setMessageList]: any[] = useState([]);
  const [chat, setChat]: any = useState();
  const [chatList, setChatList]: any[] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const user: User = useSelector((state: State) => state.user) as User;
  const socket = io("http://localhost:3000");
  useEffect(() => {
    fetchContact();
    
    socket.emit("setup", user._id);
    socket.on("connection", () => console.log("hi, I am connected to socket"));
    return () => {
      console.log("socket disconnected");
    };
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessage: Message) => {
      setMessageList((prev: Message[]) => [...prev, newMessage]);
    });
  });
  const handleChatList = (newChat: any) => {
    setChatList((prev: any) => [...prev, newChat]);
    newChat.users.find((newUser: User) => {
      if (user._id !== newUser._id) {
        handleChat(newUser._id, newUser.name, newUser.profileImage, newChat);
      }
    });
  };
  const fetchMessages = async (_id: string, chat: Chat) => {
    await fetchChatMessage({ chatId: _id })
      .then((res) => {
        setChat(chat);
        setMessageList(res.data);
      })
      .catch((error) =>
        console.log("error while fetching the messags of chat", error)
      );
  };
  const handleMessageList = (newMessage: Message) => {
    setMessageList((prev: Message[]) => [...prev, newMessage]);
    socket.emit("new message", newMessage);
  };
  const handleChat = async (
    _id: string,
    name: string,
    profileImage: string,
    chat: Chat
  ) => {
    setName(name);
    setImage(profileImage);
    fetchMessages(_id, chat);
    socket.emit("join chat", _id);
  };

  const fetchContact = async () => {
    await fetchAllChats({ userId: user?._id })
      .then((res) => {
        setChatList(() => res.data);
      })
      .catch((error) =>
        console.log("got error while fetching contacts", error)
      );
  };

  return (
    <MessageContainer>
      <Contacts
        chatList={chatList}
        handleChatList={handleChatList}
        handleChat={handleChat}
      />
      <div
        style={{ display: "flex", flexDirection: "column", overflow: "auto" }}
      >
        {name.length ? (
          <>
            <Profile name={name} image={image} />
            <MessageList
              chat={chat}
              handleMessageList={handleMessageList}
              messages={messageList}
            />
          </>
        ) : (
          <NoConversation />
        )}
      </div>
    </MessageContainer>
  );
}

export default Messages;