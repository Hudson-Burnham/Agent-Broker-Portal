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
import ChatMe from "../../../sidenav-chat-img.jpg";

const FixedNav = styled("div")({
  position: "fixed",
  height: "100vh",
  padding: "24px",
  width: "225px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  boxShadow: "20px 20px 60px #e0e0e0,-20px -20px 60px #ffffff",
  paddingTop: "56px",
  overflow: 'auto'
});
const CustomBox = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  margin: "0 0 26px 0",
});
const ImgBox = styled("div")({
  position: "relative",
  margin: '12px 0',
  marginTop: 'auto'
});
const ImgText = styled("div")({
  position: "absolute",
  bottom: 0,
  left: "30%",
  cursor: "pointer",
  padding: "2px",
});

export default function SideNavbar() {
  return (
    <FixedNav>
      <CustomBox>
        <Typography variant="subtitle2" fontWeight={600}>
          General
        </Typography>
      </CustomBox>
      <div>
        <CustomBox>
          <Dashboard />
          <Typography variant="subtitle1">Dashboard</Typography>
        </CustomBox>
        <CustomBox>
          <Leaderboard />
          <Typography variant="subtitle1">Leaderboard</Typography>
        </CustomBox>
        <CustomBox>
          <Chat />
          <Typography variant="subtitle1">Chat Messages</Typography>
        </CustomBox>
      </div>
      <CustomBox>
        <Typography variant="subtitle2" fontWeight={600}>
          Business Tools
        </Typography>
      </CustomBox>
      <div>
        <CustomBox>
          <Apps />
          <Typography variant="subtitle1">Resources</Typography>
        </CustomBox>
        <CustomBox>
          <VideoLibrary />
          <Typography variant="subtitle1">Tutorials</Typography>
        </CustomBox>
      </div>
      <CustomBox>
        <Typography variant="subtitle2" fontWeight={600}>
          Help
        </Typography>
      </CustomBox>
      <div>
        <CustomBox>
          <Settings />
          <Typography variant="subtitle1">Settings</Typography>
        </CustomBox>
        <CustomBox>
          <QuestionAnswer />
          <Typography variant="subtitle1">Support</Typography>
        </CustomBox>
      </div>
      <ImgBox>
        <img src={ChatMe} width="100%" />
        <ImgText>
          <Typography variant="subtitle1" fontWeight={900}>
            Chat Me 💬
          </Typography>
        </ImgText>
      </ImgBox>
    </FixedNav>
  );
}