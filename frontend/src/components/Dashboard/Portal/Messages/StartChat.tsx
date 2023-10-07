import { Typography, styled } from "@mui/material";

const Container = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  padding: '20px',
  backgroundColor: "#1A1D21",
});
export default function StartChat() {
  return (
    <Container>
      <Typography variant="h5" fontWeight={400} color='white' align="center">
        No Chat Selected. <br/>Select a chat to start a conversation
      </Typography>
    </Container>
  );
}