import { Person } from "@mui/icons-material";
import { IconButton, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";

const ProfileSection = styled("div")({
  background: "#1A1D21",
  color: 'white',
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  cursor: "pointer",
  borderBottom: "1px solid #B8B8B8"
});

type Props = {
  name: string;
  image: string;
  handleProfile: () => void;
};
function Profile(props: Props) {
  const user: User = useSelector((state: State) => state.user) as User;
  return (
    <ProfileSection>
    
      <div style={{display:'flex', justifyContent: 'flex-end', marginBottom: "8px"}}>
        <IconButton sx={{ p: 0 }}>
          <Person style={{ color: "#6F6F6F" }} />
        </IconButton>
        <Typography style={{ color: "#6F6F6F" }}>{user.email}</Typography>
      </div>
      <div>
        <Typography onClick={props.handleProfile} variant="h5">
          {props.name}
        </Typography>
      </div>
    </ProfileSection>
  );
}
export default Profile;
