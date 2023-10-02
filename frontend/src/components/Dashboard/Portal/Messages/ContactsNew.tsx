import {
  InputAdornment,
  LinearProgress,
  Typography,
  styled,
  Collapse,
  Button,
} from "@mui/material";

import img from "../../../../assets/profileImg.png";
import { Search } from "@mui/icons-material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { useEffect, useState } from "react";
import { SearchComponent } from "../MainDashboard/MainDashboard";
// import CreateChat from "./CreateChat";
import { useSelector } from "react-redux";
import OtherContacts from "./OtherContacts";

const Container = styled("div")({
  background: "#19171D",
  color: "white",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const Title = styled(Typography)({
  fontFamily: "Futura Md BT",
  fontWeight: 400,
  fontSize: "25px",
  lineHeight: "25px",
  color: "#ffffff",
  marginTop: "36px",
  marginBottom: "24px",
});

const SubTitles = styled(Typography)({
  fontFamily: "Futura Md BT",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "25px",
  color: "#ffffff",
  marginBottom: "16px",
});

const DropdownItem = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  cursor: "pointer",
  marginBottom: "16px",
});

const DropdownContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const SubItem = styled(Typography)({
  fontFamily: "Futura Bk BT",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "25px",
  letterSpacing: "-1%",
  height: "25px",
  color: "#8C8C8F",
});

const Divider = styled("hr")({
  borderColor: "#8C8C8F",
  borderWidth: "0.5px",
  width: "100%",
  margin: 0,
});

export const ContactList = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflow: "scroll",
});
export const ContactCard = styled("div")({
  padding: "16px 12px",
  display: "flex",
  gap: "16px",
  cursor: "pointer",
  borderTop: "1px solid #ebeaea",
  borderBottom: "1px solid #ebeaea",
});
export const ImgBox = styled("div")({
  background: "white",
  height: "40px",
  width: "40px",
  borderRadius: "100%",
});
export const Img = styled("img")({
  borderRadius: "100%",
  height: "100%",
  width: "100%",
});

function ContactsNew(props: Props) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Container>
      <Title>Messages</Title>

      <DropdownItem onClick={() => setDropdownOpen(!isDropdownOpen)}>
        <Typography
          style={{
            fontFamily: "Futura Md BT",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "25px",
          }}
        >
          Hudson Burnham
        </Typography>
        {isDropdownOpen ? (
          <ExpandMoreIcon color="inherit" />
        ) : (
          <ExpandLessIcon color="inherit" />
        )}
      </DropdownItem>

      {isDropdownOpen && (
        <DropdownContent>
          <SubItem>Conversations</SubItem>
          <SubItem>Tags and Reactions</SubItem>
          <SubItem>Drafts and Submissions</SubItem>
          <SubItem>Canvas</SubItem>
          <SubItem>Unread Messages</SubItem>
          <SubItem>Files</SubItem>
        </DropdownContent>
      )}

      <Divider />

      <SubTitles>Channels</SubTitles>
      <SubItem># Channel 1</SubItem>
      <SubItem># Channel 2</SubItem>
      <SubItem># Channel 3</SubItem>
      <SubItem>Add Channel</SubItem>

      <SubTitles>Direct Message</SubTitles>
      <SubItem>David</SubItem>
      <SubItem>Kelly</SubItem>
      <SubItem>Add Co-workers</SubItem>
    </Container>
  );
}

export default ContactsNew;
