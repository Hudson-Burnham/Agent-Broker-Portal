import { Typography, styled } from "@mui/material";
import mobileImg from "../../../../assets/mobile.svg";

const Container = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  padding: '20px'
});
export default function StartChat() {
  return (
    <Container>
      <img src={mobileImg} style={{width: '60%', height: '75%' }} />
      <Typography variant="h5" fontWeight={600} color='#5d5d5d'>
        No Chat Selected. Select a chat to start a conversation
      </Typography>
    </Container>
  );
}