import { Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  gap: "19px",
  padding: "40px 20px",
  color: "white",
  fontSize: "20px",
  fontWeight: 400,
});
function Leaderboard() {
  const user: User = useSelector((state: State) => state.user) as User;
  return (
    <Container>
      <div className="flex">
        <Typography style={{ color: "#131E30", fontSize: "25px" }}>
          Leaderboard
        </Typography>
        <Typography style={{ color: "#6F6F6F" }}>{user.email}</Typography>
      </div>
    </Container>
  );
}

export default Leaderboard;
