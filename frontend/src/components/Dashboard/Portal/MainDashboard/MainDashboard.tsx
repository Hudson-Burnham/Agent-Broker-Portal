import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Add, Announcement, CalendarToday, Download, ModeComment, Search } from "@mui/icons-material";
import DealsInfo from "./DealsInfo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useEffect, useState } from "react";
import { fetchAnnouncements } from "../../../../axios";

const Dashboard = styled("div")({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  gap: "19px",
  padding: "40px 20px",
  color: "white",
  fontSize: "20px",
  fontWeight: 400,
});
const BoxWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "19px",
});
const Box = styled("div")({
  // width: "100%",
  background: "linear-gradient(114.02deg, #131E30 2.5%, #263E66 97.28%)",
  borderRadius: "20px",
  padding: "24px 30px",
});
const ChatHeader = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  gap: "32px",
});
export const SearchComponent = styled(TextField)({
  background: "#F6F6F6",
  borderRadius: "5px",
  "& input": {
    padding: "8px 0px",
    color: "#000000",
  },
  "& fieldset": {
    display: "none",
  },
});
const CalendarBox = styled("div")({
  background: "linear-gradient(114.02deg, #131E30 2.5%, #263E66 97.28%)",
  borderRadius: "20px",
  display: "flex",
  width: "auto",
  position: "relative",
  height: "350px",
});
const ActivityMenu = styled("div")({
  padding: "36px 0",
  background: "#ABABAB",
  position: "absolute",
  right: 0,
  height: "100%",
  width: "80px",
  borderRadius: "0 20px 20px 0",
});
const ActivityItem = styled("div")({
  padding: "16px 24px",
  display: "flex",
  justifyContent: "center",
});
const Calendar = styled("div")({
  borderRadius: "20px",
  "& .MuiTypography-root": {
    color: "#d5d5d5 !important",
  },
  "& .MuiButtonBase-root": {
    color: "#d5d5d5 !important",
  },
});
const AnnouncementContainer = styled("div")({
  padding: '30px 24px',
  width: 'calc(100% - 80px)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto'
});
const AnnouncementBox = styled("div")({
  borderBottom: '1px solid #7A7A7A',
  display: 'grid',
  gridTemplateColumns: '30px auto 50px',
  alignItems: 'flex-start',
  paddingBottom: '12px',
  paddingTop: '8px'
});
const AnnouncementInfo = styled('div')({
  padding: '0 8px'
})

enum Activity {
  CAL = "CALENDAR",
  ANN = "ANNOUNCEMENT",
}

function MainDashboard() {
  const user: User = useSelector((state: State) => state.user) as User;
  const [activity, setActivity] = useState<Activity>(Activity.CAL);
  const [announcementList, setAnnouncementList] = useState([]);
  const handleActivity = (value: Activity) => {
    setActivity(value);
  };
  const fetchAllAnnouncements = async () => {
    await fetchAnnouncements()
      .then((res) => setAnnouncementList(res.data))
  };
  useEffect(() => {
    fetchAllAnnouncements();
    console.log(announcementList)
  }, []);
   const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <Dashboard>
      <div className="flex">
        <Typography style={{ color: "#131E30", fontSize: "25px" }}>
          Dashboard
        </Typography>
        <Typography style={{ color: "#6F6F6F" }}>{user.email}</Typography>
      </div>
      <BoxWrapper>
        <Box>
          <DealsInfo />
        </Box>
        <Box>
          <div className="flex">
            <ChatHeader>
              <Typography>Chat</Typography>
              <SearchComponent
                style={{ maxWidth: "182px" }}
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton sx={{ p: 0 }}>
                        <Search style={{ color: "#000000" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </ChatHeader>
            <IconButton
              style={{
                background: "#F6F6F6",
                borderRadius: "5px",
                padding: "2px",
              }}
            >
              <Add style={{ color: "#131e30" }} />
            </IconButton>
          </div>
        </Box>
      </BoxWrapper>
      <CalendarBox>
        {activity === Activity.CAL ? (
          <Calendar>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar sx={{ color: "white" }} />
            </LocalizationProvider>
          </Calendar>
        ) : (
          <AnnouncementContainer>
            <Typography variant="h5" mb={3}>Announcements</Typography>
            {announcementList.map((data: any, idx) => (
              <AnnouncementBox key={idx}>
               <IconButton sx={{ p: 0}}>
                <ModeComment style={{color: '#fff'}} />
               </IconButton>
               <AnnouncementInfo>
                <Typography variant="body2" mt={0.2} mb={0.5}>
                  {formatDate(data.createdAt)}
                </Typography>
                <Typography variant="subtitle1">
                  {data.text}
                </Typography>
               </AnnouncementInfo>
               <IconButton  style={{color: '#fff'}}>
                <Download />
               </IconButton>
              </AnnouncementBox>
            ))}
          </AnnouncementContainer>
        )}

        <ActivityMenu>
          <ActivityItem onClick={() => handleActivity(Activity.CAL)}>
            <CalendarToday style={{ color: "#131E30" }} />
          </ActivityItem>
          <ActivityItem onClick={() => handleActivity(Activity.ANN)}>
            <Announcement style={{ color: "#131E30" }} />
          </ActivityItem>
        </ActivityMenu>
      </CalendarBox>
    </Dashboard>
  );
}

export default MainDashboard;
