import { Typography, styled } from "@mui/material";

import { useSelector } from "react-redux";

const Wrapper = styled("div")({
  height: "100vh",
  width: "350px",
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  boxShadow: "8px 8px 20px #0e0e1d",
  background: "#131E30",
  overflowY: "auto",
  padding: "42px 20px",
  gap: "24px",
});
const ProfileBox = styled("div")({
  padding: "20px 12px",
  borderRadius: "8px",
  boxShadow: "5px 5px 10px #0b121d, -5px -5px 10px #0b121d" ,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
const ImgContainer = styled("div")({
  borderRadius: "100px",
  width: '100px',
  height: '100px',
  background: "#A29181",
});
const Image = styled("img")({
  borderRadius: "100px",
  width: "100px",
  height: "100px",
});
const InfoContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
  width: "100%",
});
const InfoBox = styled("div")({
  width: "100%",
  borderRadius: "8px",
  background: "#A29181",
  boxShadow: '5px 5px 10px #0e1724, -5px -5px 10px #0e1724',
  padding: "4px 2px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});


export default function Profile() {
  const user: User = useSelector((state: State) => state.user) as User
  return (
    <Wrapper>
        <Typography variant="h5" fontWeight={600} color="white">
          Hi, {user.username} 👋
        </Typography>
     
        <ProfileBox>
        <ImgContainer>
          <Image src={user.profileImage} />
        </ImgContainer>
        <Typography variant="h6" color="white" m={1}>
         {user.firstName} {user.lastName}
        </Typography>
        <InfoContainer>
            <InfoBox>
              <Typography
                variant="h5"
                color="#ffffff"
                fontWeight={700}
                align="center"
              >
                12/13
              </Typography>
              <Typography variant="body2" color="#d5d5d5" align="center">
                Closing Ratio
              </Typography>
            </InfoBox>
            <InfoBox>
              <Typography
                variant="h5"
                color="#ffffff"
                fontWeight={700}
                align="center"
              >
                8/10
              </Typography>
              <Typography variant="body2" color="#d5d5d5" align="center">
                Sales/Leases Ratio
              </Typography>
            </InfoBox>
            <InfoBox>
              <Typography
                variant="h5"
                color="#ffffff"
                fontWeight={700}
                align="center"
              >
                4/5
              </Typography>
              <Typography variant="body2" color="#d5d5d5">
                Trainings
              </Typography>
            </InfoBox>
          </InfoContainer>
  
      </ProfileBox>
     
       
    </Wrapper>
  );
}
