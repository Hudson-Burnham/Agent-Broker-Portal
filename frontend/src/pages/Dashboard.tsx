import RightWrapper from "../components/Dashboard/Navbar/RightWrapper"
import SideNavbar from "../components/Dashboard/Navbar/SideNavbar"
import Portal from "../components/Dashboard/Portal/Portal"

function Dashboard() {
  return (
    <div style={{display: 'flex'}}>
      <SideNavbar />
      <Portal />
      <RightWrapper />
    </div>
  )
}

export default Dashboard