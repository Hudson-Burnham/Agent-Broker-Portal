import { Typography, styled } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Wrapper = styled("div")({
  height: "100vh",
  width: "350px",
  display: "flex",
  flexDirection: "column",
  alignItems: 'center',
  boxShadow: "8px 8px 20px #0e0e1d",
  background: "#1c1c38",
  overflowY: "auto",
  padding: "42px 24px",
  gap: "24px",
});
const ProfileBox = styled("div")({
  padding: "16px 12px",
  borderRadius: "8px",
  border: "2px solid white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
const ImgContainer = styled("div")({
  borderRadius: "100px",
  width: '100px',
  height: '100px',
  background: "white",
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
  border: "2px solid #5b66a9",
  background: "#2f3b80",
  padding: "4px 2px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
const Calendar = styled("div")({
  width: "100%",
  borderRadius: "24px",
  background: "#2f3b80",

  "& .MuiTypography-root": {
    color: "white !important",
  },
  "& .MuiButtonBase-root": {
    color: "white !important",
  },
});
type Props = {
  name: string;
  profileImage: string;
  email?: string;
  user?: boolean;
};
export default function Profile(props: Props) {
  return (
    <Wrapper style={{ width: props.user ? "350px" : "250px" }}>
      {props.user ? (
        <Typography variant="h5" fontWeight={600} color="white">
          Hi, Mr. {props.name} 👋
        </Typography>
      ) : (
        ""
      )}
      {props.user ?
        <ProfileBox>
        <ImgContainer>
          <Image src={props.profileImage} />
        </ImgContainer>
        <Typography variant="h6" color="white" m={1}>
          Mr. {props.name}
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
              <Typography variant="body2" color="#ffffff55" align="center">
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
              <Typography variant="body2" color="#ffffff55" align="center">
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
              <Typography variant="body2" color="#ffffff55">
                Trainings
              </Typography>
            </InfoBox>
          </InfoContainer>
     
      </ProfileBox>
       : <>
        <ImgContainer>
          <Image src={props.profileImage} />
        </ImgContainer>
        <Typography variant="h6" color="white" m={1}>
          Mr. {props.name}
        </Typography>
      </> }
    
      {props.user ? (
        <Calendar>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar sx={{ color: "white" }} />
          </LocalizationProvider>
        </Calendar>
      ) : (
        ""
      )}
    </Wrapper>
  );
}
