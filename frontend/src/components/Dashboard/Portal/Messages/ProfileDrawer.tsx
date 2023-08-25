import { useSelector } from "react-redux";
import { IconButton, Typography, styled } from "@mui/material";
import { Close } from "@mui/icons-material";

const Wrapper = styled("div")({
  background: "#1c1c38",
  padding: "24px 28px",
  color: '#abb6f8',
  width: '280px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});
const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: '100%',
  margin: '5px 0'
});
const ImgBox = styled("div")({
  marginTop: '40px',
  width: "100px",
  height: "100px",
  borderRadius: "50%",
});
const AboutSection = styled('div')({
  marginTop: '24px',
  padding: '16px',
  border: '3px solid #abb6f855',
  borderRadius: '12px',
  width: '100%'
})
type Props = {
  info: User[];
  handleProfile: () => void
};
function ProfileDrawer(props: Props) {
  const user: User = useSelector((state: State) => state.user) as User;
  const userProfile: any = props.info.find((searchUser) => {
    if (user._id !== searchUser._id) return searchUser;
  });

  return (
    <Wrapper>
      <Header>
        <Typography variant="subtitle1" fontWeight={800}>
          Contact Info
        </Typography>
        <IconButton style={{color: 'inherit', padding: 0}} onClick={props.handleProfile}>
          <Close />
        </IconButton>
      </Header>
      <ImgBox>
        <img width={'100%'} height={'100%'} style={{borderRadius: '50%'}} src={userProfile.profileImage} />
      </ImgBox>
      <Typography variant="h6" color="#abb6f8" mt={1.5}>{userProfile.name}</Typography>
      <Typography variant="subtitle1" color="#808dd699">{userProfile.email}</Typography>
      <AboutSection>
        <Typography variant="body2">
          This is about me ...
        </Typography>
      </AboutSection>
    </Wrapper>
  );
}

export default ProfileDrawer;
