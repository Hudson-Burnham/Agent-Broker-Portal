import SideNavbar from "../components/Dashboard/Navbar/SideNavbar";
import MainDashboard from "../components/Dashboard/Portal/MainDashboard/MainDashboard";
import Messages from "../components/Dashboard/Portal/Messages/Messages";
import Resources from "../components/Dashboard/Portal/Resources/Resources";
import Tutorials from "../components/Dashboard/Portal/Tutorials";
import Settings from "../components/Dashboard/Portal/Settings";
import Leaderboard from "../components/Dashboard/Portal/Leaderboard";
import Support from "../components/Dashboard/Portal/Support";
import { useEffect, useState } from "react";
import { styled } from "@mui/material";
import CreateProfile from "../components/Dashboard/Portal/Profile/CreateProfile";
import { getUser } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/action";

const BoxWrapper = styled("div")({
  width: "100%",
  height: "100vh",
  paddingLeft: '211px',
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
      return <Tutorials />;
    case "6":
      return <Settings />;
    case "7":
      return <Support />;
  }
};
function Dashboard() {
  const user: User = useSelector((state: State) => state.user) as User;
  const dispatch = useDispatch();
  const [tab, setTab] = useState("1");
  const [loading, setLoading] = useState(true)

  console.log('user details after login', user)

  const fetchUserProfile = async () => {
    await getUser({ userId: user._id })
      .then((res) => {
        dispatch(setUser(res.data))
      })
      .catch((error) => console.log(error));
      setLoading(false)
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
  const handleChange = (value: string) => {
    setTab(() => value);
  };
 
  return loading ? <div>Loading ...</div> : user.firstLogin.profile ? (
    <CreateProfile />
  ) : (
    <div style={{ display: "flex" }}>
      <SideNavbar tab={tab} handleTabs={handleChange} />
      <BoxWrapper>
        {Portal(tab)}
      </BoxWrapper>
    </div>
  );
}

export default Dashboard;