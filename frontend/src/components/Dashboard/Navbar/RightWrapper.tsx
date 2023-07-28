import { Typography, styled } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ProfilPhoto from "../../profile.jpg"

const Wrapper = styled("div")({
  position: "fixed",
  right: 0,
  height: "100vh",
  width: "350px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "20px 20px 60px #e0e0e0,-20px -20px 60px #ffffff",
  overflowY: "auto",
  padding: "42px 24px",
  background: "#131E32",
  gap: '24px'
  
});
const ProfileBox = styled('div')({
  padding: '28px 12px',
  borderRadius: '8px',
  border: '2px solid #292A2B',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})
const Image = styled('img')({
  borderRadius: '100px',
  width: '100px',
  height: '100px'

})
const InfoContainer = styled('div')({
  display: 'flex',
  gap: '8px',
  width: '100%',
})
const InfoBox = styled('div')({
  width: '100%',
  borderRadius: "8px",
  background: '#292A2B88',
  padding: '4px 2px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})
const Calendar = styled('div')({
    width: "100%",
    borderRadius: "24px",
    background: '#292A2B',
    '& .MuiTypography-root': {
        color: 'white !important'
      },
      '& .MuiButtonBase-root': {
        color: 'white !important'
      }
})
export default function RightWrapper() {
  return (
    <Wrapper>
      <Typography variant="h5" fontWeight={600} color="white">
        Hi, Mr. Hudson Burnam 👋
      </Typography>
      <ProfileBox>
        <Image src={ProfilPhoto} />
        <Typography variant="h6" color='white' m={1}>Mr. Hudson Burnam</Typography>
        <InfoContainer>
          <InfoBox>
            <Typography variant="h5" color="#ffffff99" fontWeight={700} align="center">78</Typography>
            <Typography variant="body2" color="#ffffff33">Deals Made</Typography>
          </InfoBox>
          <InfoBox>
            <Typography variant="h5" color="#ffffff99" fontWeight={700} align="center">8</Typography>
            <Typography variant="body2" color="#ffffff33">Deals Broke</Typography>
          </InfoBox>
          <InfoBox>
            <Typography variant="h5" color="#ffffff99" fontWeight={700} align="center">80%</Typography>
            <Typography variant="body2" color="#ffffff33">Success Rate</Typography>
          </InfoBox>
        </InfoContainer>
      </ProfileBox>

      <Calendar>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar sx={{color:'white'}} />
        </LocalizationProvider>
      </Calendar>
    </Wrapper>
  );
}