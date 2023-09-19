import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Add, Search } from "@mui/icons-material";
import DealsInfo from "./DealsInfo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

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
  maxWidth: "182px",
  "& input": {
    padding: "8px 0px",
    color: "#000000",
  },
  "& fieldset": {
    display: "none",
  },
});
const CalendarBox = styled('div')({
  background: "linear-gradient(114.02deg, #131E30 2.5%, #263E66 97.28%)",
  borderRadius: "20px",
  display: 'flex',
  width: 'auto'
})
const Calendar = styled("div")({
  borderRadius: "20px",
  "& .MuiTypography-root": {
    color: "#d5d5d5 !important",
  },
  "& .MuiButtonBase-root": {
    color: "#d5d5d5 !important",
  },
});

function MainDashboard() {
  const user: User = useSelector((state: State) => state.user) as User;
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
      <Calendar>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar sx={{ color: "white" }} />
          </LocalizationProvider>
        </Calendar>
      </CalendarBox>
      
    </Dashboard>
  );
}

export default MainDashboard;