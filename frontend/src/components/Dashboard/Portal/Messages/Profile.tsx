import { Typography, styled } from "@mui/material";

const ProfileSection = styled("div")({
  background: "linear-gradient(145deg, #737fc1, #8997e5)",
  boxShadow: "14px 14px 50px #525a89",
  padding: "10px 20px",
  display: "flex",
  alignItems: 'center',
  gap: "16px",
});
const ImgBox = styled("div")({
  background: "white",
  borderRadius: "100%",
  height: "50px",
  width: "50px",
});
const Img = styled("img")({
  borderRadius: "100%",
  height: "100%",
  width: "100%",
});
type Props = {
  name: string;
  image: string;
};
function Profile(props: Props) {
  return (
    <ProfileSection>
      <ImgBox>
        <Img src={props.image} />
      </ImgBox>
      <Typography variant="h5">{props.name}</Typography>
    </ProfileSection>
  );
}

export default Profile;