import { Typography, styled } from "@mui/material";

const ProfileSection = styled("div")({
  background: "#808dd6",
  boxShadow: "20px 20px 60px #646ea7, -20px -20px 60px #9cacff",
  padding: "16px 20px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  cursor: "pointer",
});

const ImgBox = styled("div")({
  background: "white",
  borderRadius: "100%",
  height: "40px",
  width: "40px",
});
const Img = styled("img")({
  borderRadius: "100%",
  height: "100%",
  width: "100%",
});

type Props = {
  name: string;
  image: string;
  handleProfile: () => void;
};
function Profile(props: Props) {
  return (
    <ProfileSection>
      <ImgBox onClick={props.handleProfile}>
        <Img src={props.image} />
      </ImgBox>
      <Typography onClick={props.handleProfile} variant="h6">
        {props.name}
      </Typography>
    </ProfileSection>
  );
}

export default Profile;
