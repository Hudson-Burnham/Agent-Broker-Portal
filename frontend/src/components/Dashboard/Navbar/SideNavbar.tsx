import {
  Apps,
  Chat,
  Dashboard,
  Leaderboard,
  Logout,
  QuestionAnswer,
} from "@mui/icons-material";
import { Typography, styled } from "@mui/material";
import logo from "../../../assets/images/logo.png";
import { useSelector } from "react-redux";

const FixedNav = styled("div")({
  position: "fixed",
  height: "100vh",
  width: "211px",
  display: "flex",
  flexDirection: "column",
  background: "#131E30",
  color: "#ebeaea",
  overflow: "auto",
  justifyContent: "space-between",
  paddingTop: "48px",
});
const ProfileBox = styled("div")({
  padding: "20px 36px",
});
const ProfileImg = styled("img")({
  width: "90px",
  height: "90px",
  borderRadius: "50%",
});
const NavBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: "1",
  overflow: "auto",
  "& .active": {
    background: "#A29181",
    color: "white",
  },
});

const CustomBox = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  color: "#ffffff88",
  padding: "19px 36px",
  gap: "11px",
});

const Logo = styled("div")({
  padding: "20px 30px",
});

type Props = {
  tab: string;
  handleTabs: (value: string) => void;
  handleLogout: (user: boolean) => void;
};

export default function SideNavbar(props: Props) {
  const user: User = useSelector((state: State) => state.user) as User;
  const handleNavbar = (tab: string) => {
    props.handleTabs(tab);
  };
  return (
    <FixedNav>
      <ProfileBox>
        <ProfileImg src={user.profileImage} />
      </ProfileBox>
      <NavBox>
        <NavBox>
          <CustomBox
            className={props.tab === "1" ? "active" : ""}
            onClick={() => handleNavbar("1")}
          >
            <Dashboard />
            <Typography variant="subtitle1">Dashboard</Typography>
          </CustomBox>
          <CustomBox
            className={props.tab === "2" ? "active" : ""}
            onClick={() => handleNavbar("2")}
          >
            <Leaderboard />
            <Typography variant="subtitle1">Leaderboard</Typography>
          </CustomBox>
          <CustomBox
            className={props.tab === "3" ? "active" : ""}
            onClick={() => handleNavbar("3")}
          >
            <Chat />
            <Typography variant="subtitle1">Messages</Typography>
          </CustomBox>
          <CustomBox
            className={props.tab === "4" ? "active" : ""}
            onClick={() => handleNavbar("4")}
          >
            <Apps />
            <Typography variant="subtitle1">Resources</Typography>
          </CustomBox>
          <CustomBox
            className={`${props.tab === "7" ? "active" : ""}`}
            onClick={() => handleNavbar("7")}
          >
            <QuestionAnswer />
            <Typography variant="subtitle1">Support</Typography>
          </CustomBox>
        </NavBox>
        <CustomBox onClick={() => props.handleLogout(true)}>
          <Logout />
          <Typography variant="subtitle1">Logout</Typography>
        </CustomBox>
      </NavBox>
      <Logo>
        <img src={logo} />
      </Logo>
    </FixedNav>
  );
}