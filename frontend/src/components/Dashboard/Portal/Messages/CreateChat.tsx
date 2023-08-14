import { Search } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Typography,
  styled,
} from "@mui/material";
import { SearchComponent } from "../MainDashboard/MainDashboard";
import { useState } from "react";
import { createNewChat, searchUsers } from "../../../../axios";
import { useSelector } from "react-redux";

const CardContainer = styled("div")({
  marginTop: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});
const UserCard = styled("div")({
  padding: "10px 12px",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  background: "#808dd6",
  cursor: "pointer",
  color: "#2f3b80",
  borderRadius: "8px",
});
const Image = styled("img")({
  width: "28px",
  height: "28px",
  borderRadius: "100%",
});
type Props = {
  open: boolean;
  chatList: any[];
  handleChat: () => void;
  handleChatList: (newChat: any) => void;
};
function CreateChat(props: Props) {
  const [searchUser, setUser] = useState("");
  const [searchUserList, setUserList] = useState([]);
  const user: User = useSelector((state: State) => state.user) as User;

  const handleNewChat = async (newUserid: string) => {
    await createNewChat({ userId: newUserid, id: user._id })
      .then((res) => {
        if(!props.chatList.find((chat) => chat._id === res.data._id)) {
            props.handleChatList(res.data)
        }
      })
      .catch((error) =>
        console.log("error in handle NEW CHAT FUNCTION", error)
      );
  };

  const handleSearchUser = async () => {
    await searchUsers({ userId: user._id, user: searchUser })
      .then((res) => setUserList(res.data))
      .catch((err) => console.log("error in handle search user", err));
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleChat}
      PaperProps={{
        style: {
          minWidth: 400,
          height: 400,
          borderRadius: 18,
          padding: 12,
          background: "#2f3b80",
          color: "white",
        },
      }}
    >
      <DialogTitle>
        <Typography>Invite User for Chat</Typography>
      </DialogTitle>
      <DialogContent>
        <SearchComponent
          value={searchUser}
          onChange={(e) => setUser(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearchUser}>
                  <Search style={{ color: "#5b66a9" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          placeholder="Search User"
        />
        <CardContainer>
          {searchUserList.map((searchUser: User, idx) => (
            <UserCard key={idx} onClick={() => handleNewChat(searchUser._id)}>
              <Image src={searchUser.profileImage} />
              <Typography variant="body1" fontWeight={600}>
                {searchUser.name}
              </Typography>
            </UserCard>
          ))}
        </CardContainer>
      </DialogContent>
    </Dialog>
  );
}
export default CreateChat;