import { CircularProgress, Typography, styled } from "@mui/material";
import Contacts from "./Contacts";
import MessageList from "./MessageList";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import StartChat from "./StartChat";
import { fetchAllChats, fetchChatMessage } from "../../../../axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import ProfileDrawer from "./ProfileDrawer";
import AlertContainer from "../../../Login/AlertContainer";

const MessageContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "30% 70%",
  height: "100%",
  overflow: "auto",
});

const Loader = styled("div")({
  background: "#1A1D21",
  color: "#d5d5d5",
  display: "flex",
  gap: "20px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

function Messages() {
  const [Chat, setNewChat]: any = useState();
  const [contactList, setcontactList]: any[] = useState();
  const [messageList, setMessageList]: any[] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [alert, setAlert] = useState(0);
  const [alertText, setAlertText] = useState("");
  const user: User = useSelector((state: State) => state.user) as User;
  const socket = io("https://hudsonbackend.hudsonburnham.ai/");
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
      console.log("message received")
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
      .catch((error) => {
        setAlert(-1);
        setAlertText(
          "Ran into error while fetching chats, please try reloading or try again after some time"
        );
        console.log(error)
      });
  };
  const handleChat = async (chat: any, ChatProps: any) => {
    console.log(chat);
    if (Chat === undefined || ChatProps._id !== Chat._id) {
      setMessageList([]);
      setLoading(true);
      fetchMessages(ChatProps._id, ChatProps);
      setShowProfile(false);
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
  const handleProfile = () => {
    setShowProfile((prev) => !prev);
  };

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
      {alert ? (
        <AlertContainer
          alertText={alertText}
          showAlert={alert}
          setShowAlert={setAlert}
        />
      ) : (
        <></>
      )}
      <Contacts
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
              <Typography variant="h5" fontWeight={600}>
                Loading Your Chats ...
              </Typography>
            </Loader>
          ) : (
            <div style={{ display: "flex", height: "100%" }}>
              <div
                style={{ display: "flex", flexDirection: "column", flex: 1 }}
              >
                <Profile
                  name={Chat.name}
                  image={Chat.profileImage}
                  handleProfile={handleProfile}
                />
                <MessageList
                  chat={Chat}
                  handleMessageList={handleMessageList}
                  messages={messageList}
                />
              </div>

              {showProfile ? (
                <ProfileDrawer
                  info={Chat.users}
                  handleProfile={handleProfile}
                />
              ) : (
                ""
              )}
            </div>
          )
        ) : loading ? (
          <Loader>
            <CircularProgress />
            <Typography variant="h5" fontWeight={600}>
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

export default Messages;