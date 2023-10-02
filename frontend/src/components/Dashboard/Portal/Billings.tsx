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

const CurrentPlanRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
});

const UpgradePlanButton = styled("button")({
  background: "#A29181",
  color: "#FFFFFF",
  fontFamily: "Futura Bk BT",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "25px",
  padding: "8px 16px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
});

const UpgradeButtonLast = styled("button")({
  background: "#A29181",
  color: "#FFFFFF",
  fontFamily: "Futura Bk BT",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "25px",
  padding: "8px 16px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  alignSelf: "flex-end", // Aligns the button to the bottom right of the container
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

const PlansContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const PlansHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
});

const PlanBox = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: "32px",
});

const PlanCard = styled("div")(({ selected }) => ({
  padding: "16px",
  borderRadius: "8px",
  background: selected ? "#0E2A47" : "#FFFFFF",
  color: selected ? "#FFFFFF" : "#000000",
  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
}));

const UpgradeButton = styled("button")({
  padding: "12px 24px",
  borderRadius: "8px",
  background: "#0E2A47",
  color: "#FFFFFF",
  border: "none",
  cursor: "pointer",
});

const Bio = styled(Typography)({
  // Add any additional styles for the bio
});

const PersonalInfo = styled(Typography)({
  // Add any additional styles for personal information
});

const FlexContainer = styled("div")({
  display: "flex",
  gap: "16px", // Adding gap for some spacing between the boxes
});

const SmallStyledBox = styled(StyledBox)({
  width: "33.33%",
});

const LargeStyledBox = styled(StyledBox)({
  width: "66.66%",
});

const LargeStyledBoxContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
});

const FeaturesColumn = styled("div")({
  width: "calc(70% / 3)", // Divide 70% width into three equal parts for three columns
  marginRight: "16px", // Provide some spacing between columns
});

function Billings() {
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
          Billing
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

      <StyledBox>
        <BioRow>
          <HeaderText>Billing Details</HeaderText>
          <IconButton size="small" color="inherit">
            <EditIcon />
          </IconButton>
        </BioRow>
        <InfoRow>
          <div>
            <InfoHeader>Full Name</InfoHeader>
            <InfoContent>Danny Meiselman</InfoContent>
          </div>
          <div>
            <InfoHeader>Email</InfoHeader>
            <InfoContent>kelly@gmail.com</InfoContent>
          </div>
          <div>
            <InfoHeader>Phone Number</InfoHeader>
            <InfoContent>+61 73639290</InfoContent>
          </div>
          <div>
            <InfoHeader>Address</InfoHeader>
            <InfoContent>31 Ave, Chicago 11809</InfoContent>
          </div>
        </InfoRow>

        <InfoRow>
          <div>
            <InfoHeader>Your Card</InfoHeader>
            <InfoContent>Visa •••••• 6547</InfoContent>
          </div>
        </InfoRow>
      </StyledBox>

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
          Plans
        </Typography>
      </HeaderRow>

      <StyledBox>
        <CurrentPlanRow>
          <div>
            <InfoHeader>Current Plan</InfoHeader>
            <InfoContent>Starter</InfoContent>
          </div>
          <div>
            <UpgradePlanButton>Upgrade to Premium</UpgradePlanButton>
          </div>
        </CurrentPlanRow>
      </StyledBox>

      <FlexContainer>
        <SmallStyledBox>
          <CurrentPlanRow>
            <div>
              <InfoHeader>Starter Plan</InfoHeader>
            </div>
            <div>
              <InfoContent>Free</InfoContent>
            </div>
          </CurrentPlanRow>
          <CurrentPlanRow>
            <div>
              <InfoContent>Feature 1</InfoContent>
            </div>
          </CurrentPlanRow>
          <CurrentPlanRow>
            <div>
              <InfoContent>Feature 2</InfoContent>
            </div>
          </CurrentPlanRow>
          <CurrentPlanRow>
            <div>
              <InfoContent>Feature 3</InfoContent>
            </div>
          </CurrentPlanRow>
          <CurrentPlanRow>
            <div>
              <InfoContent>Feature 4</InfoContent>
            </div>
          </CurrentPlanRow>
          <CurrentPlanRow>
            <div>
              <InfoContent>Feature 5</InfoContent>
            </div>
          </CurrentPlanRow>
        </SmallStyledBox>

        <LargeStyledBox>
          <CurrentPlanRow>
            <div>
              <InfoHeader>Premium Plan</InfoHeader>
            </div>
            <div>
              <InfoContent>$80 / month</InfoContent>
            </div>
          </CurrentPlanRow>
          <CurrentPlanRow>
            <div>
              <InfoContent>
                The Premium plan is best suited for real estate professionals
                who want to improve their sales performance. Everything in the
                Standard plan, plus:
              </InfoContent>
            </div>
          </CurrentPlanRow>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <FeaturesColumn>
              <InfoContent>Features 1</InfoContent>
              <InfoContent>Features 2</InfoContent>
              <InfoContent>Features 3</InfoContent>
            </FeaturesColumn>
            <FeaturesColumn>
              <InfoContent>Features 4</InfoContent>
              <InfoContent>Features 5</InfoContent>
              <InfoContent>Features 6</InfoContent>
            </FeaturesColumn>
            <FeaturesColumn>
              <InfoContent>Features 7</InfoContent>
              <InfoContent>Features 8</InfoContent>
              <InfoContent>Features 9</InfoContent>
            </FeaturesColumn>
          </div>
          <LargeStyledBoxContent>
            <UpgradeButtonLast>Upgrade to Premium</UpgradeButtonLast>
          </LargeStyledBoxContent>
        </LargeStyledBox>
      </FlexContainer>
    </ProfileContainer>
  );
}

export default Billings;
