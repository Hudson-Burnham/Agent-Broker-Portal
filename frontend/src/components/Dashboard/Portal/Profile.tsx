import React from "react";
import { Typography, styled, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import avatarImage from "../../../assets/ProfileImg.png";

const ProfileContainer = styled("div")({
  marginTop: "36px",
  color: "#131E30",
  padding: "16px 32px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

const HeaderRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const NavRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "24px", // Adding more space above
});

const ProfileImageBox = styled("div")({
  width: "70px", // Set width
  height: "70px", // Set height
  borderRadius: "100%",
  overflow: "hidden",
  marginRight: "12px",
  background: `url(${avatarImage}) no-repeat center/cover`, // Set the image as a background
});

const EditProfileText = styled(Typography)({
  textDecoration: "underline",
  color: "#000000",
  fontFamily: "Futura Bk BT",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "25px",
});

const NavButton = styled("button")<{ isSelected?: boolean }>(
  ({ isSelected }) => ({
    background: isSelected ? "#A29181" : "#f6f6f6",
    color: isSelected ? "#FFFFFF" : "#000000",
    fontFamily: "Futura Bk BT",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "25px",
    padding: "8px 16px",
    margin: "0 4px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  })
);

const StyledBox = styled(Box)({
  background: "linear-gradient(90deg, #131E30 100%, #263E66 100%)",
  border: "0.5px solid #000000",
  borderRadius: "15px",
  padding: "16px",
  marginBottom: "16px",
  color: "#ffffff",
});

const BioRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px", // Added a margin for spacing between the header and the content
});

const HeaderText = styled(Typography)({
  fontFamily: "Futura Md BT",
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "25px",
  flexGrow: 1, // To allow it to consume all available space
});

const BioContent = styled(Typography)({
  fontFamily: "Futura Bk BT",
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "25px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "#ffffff", // Text color set to white
});

const InfoRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "75%",
  marginBottom: "8px",
});

const InfoHeader = styled(Typography)({
  fontFamily: "Futura Bk BT",
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "25px",
  textAlign: "left",
  color: "#FFFFFF",
});

const InfoContent = styled(Typography)({
  fontFamily: "Futura Bk BT",
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "25px",
  textAlign: "left",
  color: "#FFFFFF",
  marginTop: "4px",
});

const Bio = styled(Typography)({
  // Add any additional styles for the bio
});

const PersonalInfo = styled(Typography)({
  // Add any additional styles for personal information
});

function Profile() {
  return (
    <ProfileContainer>
      <HeaderRow>
        <Typography
          variant="h5"
          style={{
            fontFamily: "Futura Md BT",
            fontWeight: 400,
            fontSize: "25px",
            lineHeight: "25px",
          }}
        >
          Profile
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <PersonIcon color="action" style={{ color: "#6f6f6f" }} />
          <Typography
            display="inline"
            style={{
              marginLeft: "8px",
              color: "#6f6f6f",
              fontFamily: "Futura Bk BT",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "25px",
            }}
          >
            kelly@gmail.com
          </Typography>
        </div>
      </HeaderRow>

      <NavRow>
        <div style={{ display: "flex", alignItems: "center" }}>
          <ProfileImageBox />
          <EditProfileText>Edit profile picture</EditProfileText>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <NavButton>Team Lead</NavButton>
          <NavButton isSelected>Broker</NavButton>
          <NavButton>Leasing Agent</NavButton>
          <NavButton>Agent in Training</NavButton>
        </div>
      </NavRow>

      <StyledBox>
        <BioRow>
          <HeaderText>Bio</HeaderText>
          <IconButton size="small" color="inherit">
            <EditIcon />
          </IconButton>
        </BioRow>
        <BioContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          vel ornare sapien, in finibus elit. Sed ac dapibus ipsum, nec mollis
          libero. Suspendisse potenti. Morbi ultrices libero nec dolor dapibus,
          eget euismod ante lobortis. Mauris egestas turpis ac odio pharetra
          lacinia. Sed in semper enim, eu tincidunt libero. Integer feugiat
          lorem at turpis suscipit, a bibendum nulla varius.
        </BioContent>
      </StyledBox>

      <StyledBox>
        <BioRow>
          <HeaderText>Personal Info</HeaderText>
          <IconButton size="small" color="inherit">
            <EditIcon />
          </IconButton>
        </BioRow>

        <InfoRow>
          <div>
            <InfoHeader>First Name</InfoHeader>
            <InfoContent>Kelly</InfoContent>
          </div>
          <div>
            <InfoHeader>Last Name</InfoHeader>
            <InfoContent>Nelson</InfoContent>
          </div>
          <div>
            <InfoHeader>Date of Birth</InfoHeader>
            <InfoContent>18/09/1994</InfoContent>
          </div>
        </InfoRow>

        <BioRow>
          <HeaderText>Location</HeaderText>
          <IconButton size="small" color="inherit">
            <EditIcon />
          </IconButton>
        </BioRow>

        <InfoRow>
          <div>
            <InfoHeader>TimeZone</InfoHeader>
            <InfoContent>UTC +10:00 Chicago</InfoContent>
          </div>
          <div>
            <InfoHeader>Address</InfoHeader>
            <InfoContent>23, Avenue, Chicago</InfoContent>
          </div>
          <div>
            <InfoHeader>Country</InfoHeader>
            <InfoContent>United States</InfoContent>
          </div>
        </InfoRow>

        <BioRow>
          <HeaderText>Contact Details</HeaderText>
          <IconButton size="small" color="inherit">
            <EditIcon />
          </IconButton>
        </BioRow>

        <InfoRow>
          <div>
            <InfoHeader>Email</InfoHeader>
            <InfoContent>kelly@gmail.com</InfoContent>
          </div>
          <div>
            <InfoHeader>Phone Number</InfoHeader>
            <InfoContent>+61 763459846</InfoContent>
          </div>
        </InfoRow>
      </StyledBox>
    </ProfileContainer>
  );
}

export default Profile;
