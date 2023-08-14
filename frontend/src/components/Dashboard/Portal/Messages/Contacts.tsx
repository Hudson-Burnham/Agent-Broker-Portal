import { IconButton, InputAdornment, Typography, styled } from "@mui/material";
import img from "../../../../profileImg.png";
import { AddCircle, Search } from "@mui/icons-material";
import { useState } from "react";
import { SearchComponent } from "../MainDashboard/MainDashboard";
import CreateChat from "./CreateChat";
import { useSelector } from "react-redux";
const ContactSection = styled("div")({
  background: "#2f3b80",
  color: "white",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  padding: "24px 0 2px 0",
});
const ContactForm = styled("div")({
  margin: "10px 0",
  display: "grid",
  padding: "12px 32px",
  gridTemplateColumns: "repeat(2, 1fr)",
  color: "#808dd6",
  ".active": {
    background: "#808dd6",
    boxShadow: "11px 11px 22px  #737fc1,,-11px -11px 22px #8d9beb",
    color: "#2f3b80",
    scale: "1.05",
  },
});
const Item = styled("div")({
  padding: "9px 3px",
  border: "2px solid #808dd6",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  cursor: "pointer",
});
const ContactHeader = styled("div")({
  display: "flex",
  padding: "16px 20px",
  gap: "12px",
});
const ContactList = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflow: "scroll",
});
const ContactCard = styled("div")({
  padding: "16px 12px",
  display: "flex",
  gap: "16px",
  cursor: "pointer",
  borderTop: "1px solid #808dd6",
  borderBottom: "1px solid #808dd6",
});
const ImgBox = styled("div")({
  background: "white",
  height: "40px",
  width: "40px",
  borderRadius: "100%",
});
const Img = styled("img")({
  borderRadius: "100%",
  height: "100%",
  width: "100%",
});

type Props = {
  chatList: any[];
  handleChatList: (newChat: any) => void;
  handleChat: (_id: string, name: string, profileImage: string, chat: Chat) => void;
};
function Contacts(props: Props) {
  const [val, setValue] = useState("1");
  const [createChat, setCreateChat] = useState(false);
  const user: User = useSelector((state: State) => state.user) as User
 

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };
  const handleChat = () => {
    setCreateChat((prev) => !prev);
  };

  return (
    <ContactSection>
      <ContactForm>
        <Item
          className={`${val === "1" ? "active" : ""}`}
          onClick={() => setValue("1")}
        >
          <Typography variant="subtitle2" fontWeight={600} color="inherit">
            Direct Messages
          </Typography>
        </Item>
        <Item
          className={`${val === "2" ? "active" : ""}`}
          onClick={() => setValue("2")}
        >
          <Typography variant="subtitle2" fontWeight={600} color="inherit">
            Group Chats
          </Typography>
        </Item>
      </ContactForm>
      <ContactHeader>
        <SearchComponent
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: "#5b66a9" }} />
              </InputAdornment>
            ),
          }}
          fullWidth
          placeholder="Search from contact list"
        />
        <IconButton sx={{ p: "8px 0" }} onClick={handleChat}>
          <AddCircle style={{ color: "#5b66a9" }} />
        </IconButton>
      </ContactHeader>

      <ContactList>
        {props.chatList.map((chat, idx) => (
          <ContactCard
            key={idx}
            onClick={() =>
              props.handleChat(
                chat._id,
                chat.isGroup ? "Group Chat" : (chat.users[0]._id === user._id ? chat.users[1].name : chat.users[0].name ),
                chat.isGroup ? img : (chat.users[0]._id === user._id ? chat.users[1].profileImage : chat.users[0].profileImage),
                chat
              )
            }
          >
            {chat.isGroup ? (
              <>
                <ImgBox>
                  <Img src={img} />
                </ImgBox>
                <div className="flex" style={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    className="message-contact-text"
                  >
                    {chat.conversationName}
                  </Typography>
                  <Typography fontSize={12} color={"#ffffff55"}>
                    {formatDate(chat.updatedAt)}
                  </Typography>
                </div>
              </>
            ) : (
              <>
                <ImgBox>
                  <Img src={chat.users[0]._id === user._id ? chat.users[1].profileImage : chat.users[0].profileImage} />
                </ImgBox>
                <div className="flex" style={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    className="message-contact-text"
                  >
                    {chat.users[0]._id === user._id ? chat.users[1].name : chat.users[0].name}
                  </Typography>
                  <Typography fontSize={12} color={"#ffffff55"}>
                    {formatDate(chat.updatedAt)}
                  </Typography>
                </div>
              </>
            )}
          </ContactCard>
        ))}
      </ContactList>
      {createChat && (
        <CreateChat
          open={createChat}
          chatList={props.chatList}
          handleChat={handleChat}
          handleChatList={props.handleChatList}
        />
      )}
    </ContactSection>
  );
}

export default Contacts;