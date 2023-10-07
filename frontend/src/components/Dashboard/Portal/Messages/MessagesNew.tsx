import { CircularProgress, Typography, styled } from "@mui/material";
import ContactsNew from "./ContactsNew";
// import MessageList from "./MessageList";
// import Profile from "./Profile";
import StartChatNew from "./StartChatNew";
import { useEffect, useState } from "react";
import { fetchAllChats, fetchChatMessage } from "../../../../axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
// import ProfileDrawer from "./ProfileDrawer";
import StartChat from "./StartChat";

const MessageContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "30% 70%",
  height: "100%",
  overflow: "auto",
});

const Loader = styled("div")({
  backgroundColor: "#1A1D21",
  color: "white",
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

function MessagesNew() {
  const [Chat, setNewChat]: any = useState();
  const [contactList, setcontactList]: any[] = useState();
  const [messageList, setMessageList]: any[] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [showProfile, setShowProfile] = useState(false);
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
      setMessageList((prev: Message[]) => [...prev, newMessage]);
      fetchContact();
    });
  });
  const fetchMessages = async (_id: string, chat: Chat) => {
    await fetchChatMessage({ chatId: _id })
      .then((res) => {
        setNewChat(chat);
        setMessageList(res.data);
        setLoading(false);
      })
      .catch((error) =>
        console.log("error while fetching the messags of chat", error)
      );
  };
  const handleChat = async (chat: any, ChatProps: any) => {
    console.log(chat);
    if (Chat === undefined || ChatProps._id !== Chat._id) {
      setMessageList([]);
      setLoading(true);
      fetchMessages(ChatProps._id, ChatProps);
      // setShowProfile(false);
      socket.emit("join chat", ChatProps._id);
    }
  };
  const handlecontactList = (newChat: any) => {
    setcontactList((prev: any) => [...prev, newChat]);
  };
  const handleMessageList = (newMessage: Message) => {
    setMessageList((prev: Message[]) => [...prev, newMessage]);
    socket.emit("send message", newMessage);
  };
  // const handleProfile = () => {
  //   setShowProfile((prev) => !prev);
  // };

  const fetchContact = async () => {
    await fetchAllChats({ userId: user?._id })
      .then((res) => {
        setcontactList(() => res.data);
      })
      .catch((error) =>
        console.log("got error while fetching contacts", error)
      );
  };

  return (
    <MessageContainer>
      <ContactsNew
        contactList={contactList}
        handlecontactList={handlecontactList}
        handleChat={handleChat}
      />
      <div
        style={{ display: "flex", flexDirection: "column", overflow: "auto" }}
      >
        {Chat !== undefined ? (
          loading ? (
            <Loader>
              <CircularProgress />
              <Typography variant="h5">
                Loading Your Chats ...
              </Typography>
            </Loader>
          ) : (
            <StartChatNew
              
              chat={Chat}
              handleMessageList={handleMessageList}
              messages={messageList}
            />
          )
        ) : loading ? (
          <Loader>
            <CircularProgress />
            <Typography variant="h5" >
              Loading Your Chats ...
            </Typography>
          </Loader>
        ) : (
          <StartChat />
        )}
      </div>
    </MessageContainer>
  );
}

export default MessagesNew;
