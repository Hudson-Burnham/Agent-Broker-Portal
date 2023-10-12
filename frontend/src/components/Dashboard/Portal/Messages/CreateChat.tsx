import { Close, Search } from "@mui/icons-material";
import {
  CircularProgress,
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

const Title = styled(DialogTitle)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const CardContainer = styled("div")({
  marginTop: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  alignItems: "center",
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
  width: "100%",
});
const Image = styled("img")({
  width: "28px",
  height: "28px",
  borderRadius: "100%",
});
type Props = {
  open: boolean;
  contactList: any[];
  handleChat: () => void;
  handlecontactList: (newChat: any) => void;
};
function CreateChat(props: Props) {
  const [searchUser, setUser] = useState("");
  const [searchUserList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const user: User = useSelector((state: State) => state.user) as User;

  const handleNewChat = async (newUserid: string) => {
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
  
    if (searchUser.length) {
      setLoading(true);
      await searchUsers({ userId: user._id, user: searchUser })
        .then((res) => {
          setUserList(res.data);
          setLoading(false);
        })
        .catch((err) => console.log("error in handle search user", err));
    }
    setUser('')
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
          background: "#131E30",
          color: "#ebeaea",
        },
      }}
    >
      <Title>
        <Typography>Invite User for Chat</Typography>
        <IconButton onClick={props.handleChat}>
          <Close sx={{ color: "white" }} />
        </IconButton>
      </Title>
      <DialogContent>
        <SearchComponent
          value={searchUser}
          onChange={(e) => setUser(e.target.value)}
          style={{padding: '4px'}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearchUser} sx={{ p: 0 }}>
                  <Search style={{ color: "#5b66a9" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          placeholder="Search User"
        />
        <CardContainer>
          {loading ? (
            <CircularProgress />
          ) : (
            searchUserList.map((searchUser: User, idx) => (
              <UserCard key={idx} onClick={() => handleNewChat(searchUser._id)}>
                <Image src={searchUser.profileImage} />
                <Typography variant="body1" fontWeight={600}>
                  {searchUser.username}
                </Typography>
              </UserCard>
            ))
          )}
        </CardContainer>
      </DialogContent>
    </Dialog>
  );
}
export default CreateChat;
