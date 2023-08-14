import SideNavbar from "../components/Dashboard/Navbar/SideNavbar";
import MainDashboard from "../components/Dashboard/Portal/MainDashboard/MainDashboard";
import Messages from "../components/Dashboard/Portal/Messages/Messages";
import Resources from "../components/Dashboard/Portal/Resources/Resources";
import Tutorials from "../components/Dashboard/Portal/Tutorials";
import Settings from "../components/Dashboard/Portal/Settings";
import Leaderboard from "../components/Dashboard/Portal/Leaderboard";
import Support from "../components/Dashboard/Portal/Support";
import { useState } from "react";
import { styled } from "@mui/material";

const BoxWrapper = styled("div")({
  width: "100%",
  height: "100vh",
  background: "#121139",
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
  const [tab, setTab] = useState("1");
  const handleChange = (value: string) => {
    setTab(() => value);
  };
  return (
    <div style={{ display: "flex" }}>
      <SideNavbar tab={tab} handleTabs={handleChange} />
      <BoxWrapper style={{ paddingLeft: tab === "3" ? "88px" : "226px" }}>
        {Portal(tab)}
      </BoxWrapper>
    </div>
  );
}

export default Dashboard;