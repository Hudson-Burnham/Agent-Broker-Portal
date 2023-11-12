import SideNavbar from "../components/Dashboard/Navbar/SideNavbar";
import MainDashboard from "../components/Dashboard/Portal/MainDashboard/MainDashboard";
import Messages from "../components/Dashboard/Portal/Messages/Messages";
import Resources from "../components/Dashboard/Portal/Resources/Resources";
import Billings from "../components/Dashboard/Portal/Billings";
import Profile from "../components/Dashboard/Portal/Profile";
import Leaderboard from "../components/Dashboard/Portal/Leaderboard";
import Support from "../components/Dashboard/Portal/Support";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import CreateProfile from "../components/Dashboard/Portal/Profile/CreateProfile";
import { getUser } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../store/action";
import { Close } from "@mui/icons-material";
import { MainButton, SecondaryButton } from "../components/Login/SignIn";
import { useNavigate } from "react-router-dom";
import Properties from "../components/Dashboard/Portal/Properties/Properties";

const BoxWrapper = styled("div")({
  width: "100%",
  height: "100vh",
  paddingLeft: "211px",
});

const Portal = (value: string) => {
  switch (value) {
    case "1":
      return <MainDashboard />;
    case "2":
      return <Leaderboard />;
    case "3":
      return <Messages />;
    case "4":
      return <Resources />;
    case "5":
      return <Billings />;
    case "6": 
      return <Properties />
    case "7":
      return <Support />;
    case "8":
      return <Profile />;
  }
};
function Dashboard() {
  const user: User = useSelector((state: State) => state.user) as User;
  const isUserLoggedIn: boolean = useSelector((state: State) => state.isUserLoggedIn)
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const [loading, setLoading] = useState(true);
  const [showLogout, setShowLogout] = useState({
    user: false,
    logout: false,
  });
  const navigate = useNavigate();
  console.log("redux store: ", isUserLoggedIn)
  console.log("user details after login", user);

  const handleLogoutDialog = (user: boolean) => {
    setShowLogout({
      user: user,
      logout: !showLogout.logout,
    });
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const fetchUserProfile = async () => {
    await getUser({ userId: user._id })
      .then((res) => {
        if (!res.data.error) dispatch(setUser(res.data));
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
  const handleChange = (value: string) => {
    setTab(() => value);
  };

  return loading ? (
    <div>Loading ...</div>
  ) : user.firstLogin.profile ? (
    <CreateProfile />
  ) : (
    <div style={{ display: "flex" }}>
      <SideNavbar
        tab={tab}
        handleTabs={handleChange}
        handleLogout={handleLogoutDialog}
      />
      <BoxWrapper>{Portal(tab)}</BoxWrapper>
      {showLogout.logout && (
        <Dialog open={true} PaperProps={{ style: { width: "400px" } }}>
          {showLogout.user && (
            <DialogTitle className="flex" style={{ fontSize: "24px" }}>
              Logout
              <IconButton
                sx={{ p: 0 }}
                onClick={() => handleLogoutDialog(true)}
              >
                <Close />
              </IconButton>
            </DialogTitle>
          )}

          <DialogContent>
            <Typography mt={1.5} variant={"subtitle1"}>
              {showLogout.user
                ? "Are you sure you want to logout."
                : "Session Expired. Click continue to Login again."}
            </Typography>
          </DialogContent>
          <DialogActions>
            <MainButton onClick={handleLogout}>Continue</MainButton>
            {showLogout.user && (
              <SecondaryButton onClick={() => handleLogoutDialog(true)}>
                Close
              </SecondaryButton>
            )}
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}

export default Dashboard;
