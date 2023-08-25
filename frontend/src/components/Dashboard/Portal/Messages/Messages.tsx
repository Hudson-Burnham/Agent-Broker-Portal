import { styled } from "@mui/material";
import Contacts from "./Contacts";
import MessageList from "./MessageList";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import NoConversation from "./NoConversation";
import { fetchAllChats, fetchChatMessage } from "../../../../axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import ProfileDrawer from "./ProfileDrawer";

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
  const [showProfile, setShowProfile] = useState(false)
  const [chatUsers, setChatUsers] = useState([])
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
    socket.on("receive message", (newMessage: Message) => {
      console.log("message received via socket", newMessage, "is the new message")
      setMessageList((prev: Message[]) => [...prev, newMessage]);
    });
  });
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
  const handleChat = async (
    _id: string,
    name: string,
    profileImage: string,
    chat: any
  ) => {
    setName(name);
    setImage(profileImage);
    fetchMessages(_id, chat);
    setChatUsers(chat.users)
    setShowProfile(false)
    socket.emit("join chat", _id);
  };
  const handleChatList = (newChat: any) => {
    setChatList((prev: any) => [...prev, newChat]);
    // newChat.users.find((newUser: User) => {
    //   if (user._id !== newUser._id) {
    //     console.log("Hi I am in handleChat list function")
    //     handleChat(newUser._id, newUser.name, newUser.profileImage, newChat);
    //   }
    // });
  };
  const handleMessageList = (newMessage: Message) => {
    setMessageList((prev: Message[]) => [...prev, newMessage]);
    socket.emit("send message", newMessage);
  }; 
  const handleProfile = () => {
    setShowProfile((prev) => !prev)
  }

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
          <div style={{display: 'flex', height: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <Profile name={name} image={image} handleProfile={handleProfile} />
            <MessageList
              chat={chat}
              handleMessageList={handleMessageList}
              messages={messageList}
            />
          </div>
           
            {showProfile ? <ProfileDrawer info={chatUsers} handleProfile={handleProfile} /> : ''}
          </div>
        ) : (
          <NoConversation />
        )}
      </div>
    </MessageContainer>
  );
}

export default Messages;