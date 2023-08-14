import {
  Apps,
  Chat,
  Dashboard,
  Leaderboard,
  QuestionAnswer,
  Settings,
  VideoLibrary,
} from "@mui/icons-material";
import { Typography, styled } from "@mui/material";
import { useState } from "react";
// import ChatMe from "../../../sidenav-chat-img.jpg";

const FixedNav = styled("div")({
  position: "fixed",
  height: "100vh",
  padding: "24px",
  width: "225px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  background: "#1c1c38",
  boxShadow: "8px 8px 20px #0e0e1d",
  color: "white",
  paddingTop: "56px",
  overflow: "auto",
});
const NavBox = styled("div")({
  "& .active": {
    borderRadius: "16px",
    background: "linear-gradient(145deg, #2a3573, #323f89)",
    boxShadow: "13px 13px 26px #0e0e1c, -13px -13px 26px #2a2a54",
    color: '#ffffff'
  },
});
const CustomBox = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "18px",
  cursor: "pointer",
  marginBottom: "6px",
  padding: "12px 16px",
  color: '#ffffff88'
});
// const ImgBox = styled("div")({
//   position: "relative",
//   margin: '12px 0',
//   marginTop: 'auto'
// });
// const ImgText = styled("div")({
//   position: "absolute",
//   bottom: 0,
//   left: "30%",
//   cursor: "pointer",
//   padding: "2px",
// });

type Props = {
  tab: string;
  handleTabs: (value: string) => void;
};

export default function SideNavbar(props: Props) {
  const [collapse, setCollapse] = useState(false);
  const handleNavbar = (tab: string) => {
    props.handleTabs(tab);
    setCollapse(() => {
      switch (tab) {
        case "3":
          return true;
        default:
          return false;
      }
    });
  };
  return collapse ? (
    <FixedNav style={{ width: "auto", padding: "64px 16px" }}>
      <NavBox>

      <CustomBox
        className={props.tab === "1" ? "active" : ""}
        onClick={() => handleNavbar("1")}
      >
        <Dashboard />
      </CustomBox>
      <CustomBox
        className={props.tab === "2" ? "active" : ""}
        onClick={() => handleNavbar("2")}
      >
        <Leaderboard />
      </CustomBox>
      <CustomBox
        className={props.tab === "3" ? "active" : ""}
        onClick={() => handleNavbar("3")}
      >
        <Chat />
      </CustomBox>
      <CustomBox
        className={props.tab === "4" ? "active" : ""}
        onClick={() => handleNavbar("4")}
      >
        <Apps />
      </CustomBox>
      <CustomBox
        className={props.tab === "5" ? "active" : ""}
        onClick={() => handleNavbar("5")}
      >
        <VideoLibrary />
      </CustomBox>
      <CustomBox
        className={props.tab === "6" ? "active" : ""}
        onClick={() => handleNavbar("6")}
      >
        <Settings />
      </CustomBox>
      <CustomBox
        className={props.tab === "7" ? "active" : ""}
        onClick={() => handleNavbar("7")}
      >
        <QuestionAnswer />
      </CustomBox>
      </NavBox>

    </FixedNav>
  ) : (
    <FixedNav>
      <CustomBox>
        <Typography variant="subtitle2" fontWeight={600}>
          General
        </Typography>
      </CustomBox>
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
      </NavBox>
      <CustomBox>
        <Typography variant="subtitle2" fontWeight={600}>
          Business Tools
        </Typography>
      </CustomBox>
      <NavBox>
        <CustomBox
          className={props.tab === "4" ? "active" : ""}
          onClick={() => handleNavbar("4")}
        >
          <Apps />
          <Typography variant="subtitle1">Resources</Typography>
        </CustomBox>
        <CustomBox
          className={props.tab === "5" ? "active" : ""}
          onClick={() => handleNavbar("5")}
        >
          <VideoLibrary />
          <Typography variant="subtitle1">Tutorials</Typography>
        </CustomBox>
      </NavBox>
      <CustomBox>
        <Typography variant="subtitle2" fontWeight={600}>
          Help
        </Typography>
      </CustomBox>
      <NavBox>
        <CustomBox
          className={props.tab === "6" ? "active" : ""}
          onClick={() => handleNavbar("6")}
        >
          <Settings />
          <Typography variant="subtitle1">Settings</Typography>
        </CustomBox>
        <CustomBox
          className={`${props.tab === "7" ? "active" : ""}`}
          onClick={() => handleNavbar("7")}
        >
          <QuestionAnswer />
          <Typography variant="subtitle1">Support</Typography>
        </CustomBox>
      </NavBox>
      {/* <ImgBox>
        <img src={ChatMe} width="100%" />
        <ImgText>
          <Typography variant="subtitle1" fontWeight={900}>
            Chat Me 💬
          </Typography>
        </ImgText>
      </ImgBox> */}
    </FixedNav>
  );
}
//to do

//style the collapsed navbar
//make collapse a bit smooth - optional
//collapse the navbar on mobile view as well ?