import { Message, Notifications, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, styled } from "@mui/material";
import Profile from "./Profile";
import { useSelector } from "react-redux";

const Dashboard = styled("div")({
  display: 'flex',
  gap: '24px'
});
const Content = styled('div')({
  padding: '20px 12px',
  flex: 1
})
const Header = styled("div")({
  display: "flex",
  gap: "8px",
});
export const SearchComponent = styled(TextField)({
  border: "1px solid #5b66a9",
  borderRadius: "24px",
  "& input": {
    padding: "8px 6px",
    color: "#808dd6",
  },
  "& fieldset": {
    display: "none",
  },
});
const HeaderIcon = styled(IconButton)({
  borderRadius: "8px",
  border: "1px solid #5b66a9",
});

function MainDashboard() {
  const user: User = useSelector((state: State) => state.user) as User
  return (
    <Dashboard>
      <Content>

      <Header>
        <SearchComponent
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: "#5b66a9" }} />
              </InputAdornment>
            ),
          }}
          fullWidth
          placeholder="Search here ..."
        />
        <HeaderIcon>
          <Notifications style={{ color: "#5b66a9" }} />
        </HeaderIcon>
        <HeaderIcon>
          <Message style={{ color: "#5b66a9" }} />
        </HeaderIcon>
      </Header>
      </Content>

      <Profile name={user.name} profileImage={user.profileImage} user />
    </Dashboard>
  );
}

export default MainDashboard;
