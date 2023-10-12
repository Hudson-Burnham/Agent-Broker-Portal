import { IconButton, LinearProgress, Typography, styled } from "@mui/material";
import img from "../../../../assets/profileImg.png";
import { AddBox, KeyboardArrowDown } from "@mui/icons-material";
import { useEffect, useState } from "react";
import CreateChat from "./CreateChat";
import { useSelector } from "react-redux";

const ContactSection = styled("div")({
  background: "#19171D",
  color: "white",
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  padding: "24px 0px",
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
export const ContactList = styled("div")({
  display: "flex",
  flexDirection: "column",
  color: "#8C8C8F",
});
export const ContactCard = styled("div")({
  padding: "8px 20px",
  display: "flex",
  gap: "8px",
  cursor: "pointer",
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
  const [groupChats, setGroupChats] = useState<any[]>([]);
  const [directChats, setDirectChats] = useState<any[]>([]);
  console.log("contact list check", props.contactList);
  const [createChat, setCreateChat] = useState(false);
  const user: User = useSelector((state: State) => state.user) as User;

  useEffect(() => {
    setLoading(true);
    console.log(loading);
    if (props.contactList) {
      const groupChatList: any[] = [];
      const directContactList: any[] = [];

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
  }, [props.contactList]);

  // const formatDate = (date: string) => {
  //   return new Date(date).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "numeric",
  //     day: "numeric",
  //   });
  // };
  const handleChat = () => {
    setCreateChat((prev) => !prev);
  };
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
      {createChat && (
        <CreateChat
          open={true}
          contactList={props.contactList}
          handleChat={handleChat}
          handlecontactList={props.handlecontactList}
        />
      )}
      <div style={{ padding: "20px" }}>
        <Typography variant="h5" mt={4} mb={6}>
          Messages
        </Typography>
        <div className="flex">
          <Typography variant="h6">Hudson Burnham</Typography>
          <IconButton>
            <KeyboardArrowDown style={{ color: "white" }} />
          </IconButton>
        </div>
      </div>

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
            <div className="scroll-container">
              <Typography m={2}>Channels</Typography>
              <ContactList>
                {groupChats.map((chat, idx) => (
                  <ContactCard
                    key={idx}
                    onClick={() =>
                      props.handleChat(chat, {
                        _id: chat._id,
                        isGroup: true,
                        name: "Group Chat",
                        profileImage: img,
                        users: chat.users,
                      })
                    }
                  >
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
                    </div>
                  </ContactCard>
                ))}
              </ContactList>
              <div
                style={{
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton onClick={() => {}}>
                  <AddBox style={{ color: "#8C8C8F" }} />
                </IconButton>
                <Typography variant="body1" color={"#8C8C8F"}>
                  Add Channel
                </Typography>
              </div>
              <></>
              <>
                <Typography m={2}>Direct Message</Typography>
                <ContactList>
                  {directChats.map((chat, idx) => (
                    <ContactCard
                      key={idx}
                      onClick={() =>
                        props.handleChat(chat, {
                          _id: chat._id,
                          isGroup: false,
                          name: handleUserDetails("NAME", chat),
                          profileImage: handleUserDetails("IMG", chat),
                          users: chat.users,
                        })
                      }
                    >
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
                      </div>
                    </ContactCard>
                  ))}
                </ContactList>
                <div
                  style={{
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={() => setCreateChat((prev) => !prev)}>
                    <AddBox style={{ color: "#8C8C8F" }} />
                    <Typography variant="body1" color={"#8C8C8F"}>
                      Add Co-worker
                    </Typography>
                  </IconButton>
                </div>
              </>
            </div>
          )}
        </>
      )}
    </ContactSection>
  );
}

export default Contacts;
