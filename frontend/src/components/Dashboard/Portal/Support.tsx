import { Alert, AlertTitle, Typography } from "@mui/material";
import { Container } from "./Leaderboard";
import { useSelector } from "react-redux";

function Support() {
  const user: User = useSelector((state: State) => state.user) as User;
  return (
    <Container>
      <div className="flex" style={{ marginBottom: "20px" }}>
        <Typography style={{ color: "#131E30", fontSize: "25px" }}>
          Support
        </Typography>
        <Typography style={{ color: "#6F6F6F" }}>{user.email}</Typography>
      </div>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This page is under construction
      </Alert>
    </Container>
  );
}

export default Support;
