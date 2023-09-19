import { useEffect, useState } from "react";
import { ContactCard, ContactList, Img, ImgBox } from "./Contacts";
import { Typography } from "@mui/material";
import { createNewChat, searchUsers } from "../../../../axios";
import { useSelector } from "react-redux";
type Props = {
    contactList: any[];
    handlecontactList: (newChat: any) => void;
}
function OtherContacts(props: Props) {
  const [usersList, setUsers] = useState([]);
  const user: User = useSelector((state: State) => state.user) as User;

  const handleNewChat = async (newUserid: string) => {
    console.log('creating new chats')
    await createNewChat({ userId: newUserid, id: user._id })
      .then((res) => {
        if (!props.contactList.find((chat) => chat._id === res.data._id)) {
          props.handlecontactList(res.data);
        }
      })
      .catch((error) =>
        console.log("error in handle NEW CHAT FUNCTION", error)
      );
  };
  const handleSearchUser = async () => {
    await searchUsers({ userId: user._id, contactList: props.contactList })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log("error in handle search user", err));
  };
  useEffect(() => {
    handleSearchUser();
  }, []);
  return (
    <ContactList>
      {usersList.map((user: any) => (
        <ContactCard key={user._id} onClick={() => handleNewChat(user._id)}>
          <ImgBox>
            <Img src={user.profileImage} />
          </ImgBox>
          <div className="flex" style={{ flex: 1 }}>
            <Typography variant="subtitle1" className="message-contact-text">
              {user.username}
            </Typography>
          </div>
        </ContactCard>
      ))}
    </ContactList>
  );
}

export default OtherContacts;
