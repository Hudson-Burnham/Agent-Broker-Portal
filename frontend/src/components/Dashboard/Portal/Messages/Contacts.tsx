import {
  InputAdornment,
  LinearProgress,
  Typography,
  styled,
} from "@mui/material";
import img from "../../../../assets/profileImg.png";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { SearchComponent } from "../MainDashboard/MainDashboard";
// import CreateChat from "./CreateChat";
import { useSelector } from "react-redux";
import OtherContacts from "./OtherContacts";

const ContactSection = styled("div")({
  background: "#131E30",
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
  ".active": {
    background: "#A29181",
    boxShadow: "11px 11px 22px  #737fc1,,-11px -11px 22px #8d9beb",
    scale: "1.1",
    color: "#ffffff",
  },
});
const Item = styled("div")({
  padding: "9px 3px",
  border: "1px solid #A29181",
  color: "#ebeaea",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  cursor: "pointer",
});
const LoadingContainer = styled("div")({
  display: "flex",
  gap: "60px",
  flexDirection: "column",
  padding: "40px 60px",
});
const LoadingStack = styled(LinearProgress)({
  "& .MuiLinearProgress-bar": {
    backgroundColor: "#131E3099",
  },
});
const ContactHeader = styled("div")({
  display: "flex",
  padding: "16px 20px",
  gap: "12px",
});
export const ContactList = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflow: "scroll",
});
export const ContactCard = styled("div")({
  padding: "16px 12px",
  display: "flex",
  gap: "16px",
  cursor: "pointer",
  borderTop: "1px solid #ebeaea",
  borderBottom: "1px solid #ebeaea",
});
export const ImgBox = styled("div")({
  background: "white",
  height: "40px",
  width: "40px",
  borderRadius: "100%",
});
export const Img = styled("img")({
  borderRadius: "100%",
  height: "100%",
  width: "100%",
});

export type Props = {
  contactList: any[];
  handlecontactList: (newChat: any) => void;
  handleChat: (chat: any, Chat: any) => void;
};
function Contacts(props: Props) {
  const [loading, setLoading] = useState(true);
  const [val, setValue] = useState("1");
  console.log("contact list check", props.contactList);
  // const [createChat, setCreateChat] = useState(false);
  const user: User = useSelector((state: State) => state.user) as User;

  useEffect(() => {
    if (props.contactList) {
      setLoading(false);
    }
  });

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };
  // const handleChat = () => {
  //   setCreateChat((prev) => !prev);
  // };
  const handleUserDetails = (detail: string, chat: any) => {
    switch (detail) {
      case "NAME":
        return chat.users[0]._id === user._id
          ? chat.users[1].username
          : chat.users[0].username;
      case "IMG":
        return chat.users[0]._id === user._id
          ? chat.users[1].profileImage
          : chat.users[0].profileImage;
      default:
        return "";
    }
  };

  return (
    <ContactSection>
      <ContactForm>
        <Item
          className={`${val === "1" ? "active" : ""}`}
          onClick={() => setValue("1")}
        >
          <Typography variant="subtitle2" fontWeight={500} color="inherit">
            Direct Messages
          </Typography>
        </Item>
        <Item
          className={`${val === "2" ? "active" : ""}`}
          onClick={() => setValue("2")}
        >
          <Typography variant="subtitle2" fontWeight={500} color="inherit">
            Group Chats
          </Typography>
        </Item>
      </ContactForm>
      <ContactHeader>
        <SearchComponent
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: "#A29181" }} />
              </InputAdornment>
            ),
          }}
          fullWidth
          placeholder="Search from contact list"
        />
      </ContactHeader>
      {loading ? (
        <LoadingContainer>
          <LoadingStack />
          <LoadingStack />
          <LoadingStack />
          <LoadingStack />
          <LoadingStack />
          <LoadingStack />
        </LoadingContainer>
      ) : (
        <>
          {props.contactList.length > 0 && (
            <>
              <Typography m={2}>Contacts</Typography>
              <ContactList>
                {props.contactList.map((chat, idx) => (
                  <ContactCard
                    key={idx}
                    onClick={() =>
                      props.handleChat(chat, {
                        _id: chat._id,
                        isGroup: chat.isGroup,
                        name: chat.isGroup
                          ? "Group Chat"
                          : handleUserDetails("NAME", chat),
                        profileImage: chat.isGroup
                          ? img
                          : handleUserDetails("IMG", chat),
                        users: chat.users,
                      })
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
                          <Img src={handleUserDetails("IMG", chat)} />
                        </ImgBox>
                        <div className="flex" style={{ flex: 1 }}>
                          <Typography
                            variant="subtitle1"
                            className="message-contact-text"
                          >
                            {chat.users[0]._id === user._id
                              ? chat.users[1].username
                              : chat.users[0].username}
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
            </>
          )}
          <Typography m={2}>Other Contacts</Typography>
          <OtherContacts
            contactList={props.contactList}
            handlecontactList={props.handlecontactList}
          />
        </>
      )}
    </ContactSection>
  );
}

export default Contacts;
