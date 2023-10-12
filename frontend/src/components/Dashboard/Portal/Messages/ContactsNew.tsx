import {
  Skeleton,
  // InputAdornment,
  // LinearProgress,
  Typography,
  styled,
  // Collapse,
  // Button,
} from "@mui/material";

// import img from "../../../../assets/profileImg.png";
// import { Search } from "@mui/icons-material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { SetStateAction, useEffect, useState } from "react";
// import { SearchComponent } from "../MainDashboard/MainDashboard";
// import CreateChat from "./CreateChat";
import { useSelector } from "react-redux";
// import OtherContacts from "./OtherContacts";
import { Props } from "./Contacts";

const Container = styled("div")({
  background: "#19171D",
  color: "white",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const Title = styled(Typography)({
  fontFamily: "Futura Md BT",
  fontWeight: 400,
  fontSize: "25px",
  lineHeight: "25px",
  color: "#ffffff",
  marginTop: "36px",
  marginBottom: "24px",
});

const SubTitles = styled(Typography)({
  fontFamily: "Futura Md BT",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "25px",
  color: "#ffffff",
  marginBottom: "16px",
});

const DropdownItem = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  cursor: "pointer",
  marginBottom: "16px",
});

const DropdownContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const SubItem = styled(Typography)({
  fontFamily: "Futura Bk BT",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "25px",
  letterSpacing: "-1%",
  height: "25px",
  color: "#8C8C8F",
  cursor: "pointer",
});

const Divider = styled("hr")({
  borderColor: "#8C8C8F",
  borderWidth: "0.5px",
  width: "100%",
  margin: 0,
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

const Loader = styled(Skeleton)({
  background: "#8C8C8F",
  marginTop: '8px'
});

function ContactsNew(props: Props) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const user: User = useSelector((state: State) => state.user) as User;
  const [groupChats, setGroupChats] = useState<any[]>([]);
  const [directChats, setDirectChats] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    console.log(loading);
    if (props.contactList) {
      const groupChatList: SetStateAction<any[]> = [];
      const directContactList: SetStateAction<any[]> = [];

      props.contactList.map((contact) => {
        if (contact.isGroup) {
          groupChatList.push(contact);
        } else {
          directContactList.push(contact);
        }
      });
      setGroupChats(groupChatList);
      setDirectChats(directContactList);
      setLoading(false);
    }
    console.log("group chats", groupChats);
    console.log("direct chats", directChats);
  }, [props.contactList]);

  // const formatDate = (date: string) => {
  //   return new Date(date).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "numeric",
  //     day: "numeric",
  //   });
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
    <Container>
      {loading ? (
        <>
          <Loader variant="rectangular" animation="wave" width={'90%'} height={40} />
          <Loader variant="rectangular" animation="wave" width={'90%'} height={60} />
          <Loader variant="text" animation="wave" sx={{ fontSize: "54px" }} />
          <Loader variant="text" animation="wave" sx={{ fontSize: "32px" }} />
          <Loader variant="text" animation="wave" sx={{ fontSize: "28px" }} />
          <Loader variant="text" animation="wave" sx={{ fontSize: "28px" }} />
v        </>
      ) : (
        <>
          <Title>Messages</Title>

          <DropdownItem onClick={() => setDropdownOpen(!isDropdownOpen)}>
            <Typography
              style={{
                fontFamily: "Futura Md BT",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "25px",
              }}
            >
              Hudson Burnham
            </Typography>
            {isDropdownOpen ? (
              <ExpandMoreIcon color="inherit" />
            ) : (
              <ExpandLessIcon color="inherit" />
            )}
          </DropdownItem>

          {isDropdownOpen && (
            <DropdownContent>
              <SubItem>Conversations</SubItem>
              <SubItem>Tags and Reactions</SubItem>
              <SubItem>Drafts and Submissions</SubItem>
              <SubItem>Canvas</SubItem>
              <SubItem>Unread Messages</SubItem>
              <SubItem>Files</SubItem>
            </DropdownContent>
          )}

          <Divider />

          <SubTitles>Channels</SubTitles>
          {groupChats.map((chat) => (
            <SubItem>{chat.conversationName}</SubItem>
          ))}
          {/* <SubItem># Channel 1</SubItem>
<SubItem># Channel 2</SubItem>
<SubItem># Channel 3</SubItem> */}
          {/* add a list of group chats */}
          <SubItem>Add Channel</SubItem>

          <SubTitles>Direct Message</SubTitles>
          {directChats.map((chat, idx) => (
            <SubItem
              onClick={() =>
                props.handleChat(chat, {
                  _id: chat._id,
                  isGroup: chat.isGroup,
                  name: chat.isGroup
                    ? "Group Chat"
                    : handleUserDetails("NAME", chat),
                  profileImage: handleUserDetails("IMG", chat),
                  users: chat.users,
                })
              }
              key={idx}
            >
              {handleUserDetails("NAME", chat)}
            </SubItem>
          ))}
          {/* <SubItem>David</SubItem>
<SubItem>Kelly</SubItem> */}

          <SubItem>Add Co-workers</SubItem>
        </>
      )}
    </Container>
  );
}

export default ContactsNew;