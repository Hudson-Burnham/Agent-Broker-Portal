import { styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MainButton, SecondaryButton } from "../../../Login/SignIn";
import { Dispatch, SetStateAction, useState } from "react";
import { editUser } from "../../../../axios";
import { setUser } from "../../../../store/action";
import { AdditionalDetails, UserDetails, UserNewDetails } from "./UserDetails";
import { DocDetails } from "./Document/DocDetails";
import PaymentDetails from "./Payment/PaymentDetails";
import AlertContainer from "../../../Login/AlertContainer";
import { ReviewProfile } from "./ReviewProfile";
import { useNavigate } from "react-router-dom";

const Container = styled("div")({
  background: "#131E30",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "32px",
  alignItems: "center",
  width: "100%",
  height: "100vh",
});
const ProfileContainer = styled("div")({
  background: "#131E30",
  borderRadius: "24px",
  padding: "40px 44px",
  width: "500px",
  overflow: "auto",
  flexDirection: "column",
});
const ActionContainer = styled("div")({
  width: "100%",
  display: "flex",
  gap: "12px",
  margin: "8px 0",
});

const renderProfileForm = (
  steps: number,
  profile: any,
  setProfile: Dispatch<SetStateAction<any>>
) => {
  switch (steps) {
    case 0:
      return <UserDetails profile={profile} setProfile={setProfile} />;
    case 1:
      return <UserNewDetails profile={profile} setProfile={setProfile} />;
    case 2:
      return <AdditionalDetails profile={profile} setProfile={setProfile} />;
    case 3:
      return <DocDetails profile={profile} setProfile={setProfile} />;
    case 4:
      return <PaymentDetails />;
    case 5:
      return <ReviewProfile profile={profile} setProfile={setProfile} />;
    default:
      return <></>;
  }
};
function CreateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(0);
  const [alertText, setAlertText] = useState("");
  const [steps, setSteps] = useState(0);
  const user: User = useSelector((state: State) => state.user) as User;

  const [profile, setProfile] = useState({
    _id: user._id,
    profileImage: user.profileImage,
    firstName: "",
    lastName: "",
    bio: "",
    email: user.email,
    username: user.username,
    acknowledgement: false,
  });

  const onSubmit = async (data: any) => {
    const { acknowledgement, profileImage, ...user_details } = data;
    try {
      const formData = new FormData();
      formData.append("user_details", JSON.stringify(user_details));
      Array.isArray(profileImage)
        ? formData.append("files", profileImage[0])
        : formData.append("files", profileImage);
      await editUser(formData)
        .then((res) => {
          setAlertText("Profile Successfully Created! Navigating to Dashboard");
          setAlert(1);
          dispatch(setUser(res.data));
          setTimeout(() => {
            setAlert(0);
            navigate("/");
          }, 1000);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevSteps = () => {
    setAlert(0);
    setSteps((prev) => prev - 1);
  };

  const handleNextSteps = () => {
    setAlert(0);
    switch (steps) {
      case 0:
        setSteps((prev) => prev + 1);
        break;
      case 1:
        if (!profile.firstName.length || !profile.lastName.length) {
          setAlert(-1);
          setAlertText("Please provide the given below details to proceed");
        } else {
          setSteps((prev) => prev + 1);
        }
        break;
      case 2:
        setSteps((prev) => prev + 1);
        break;
      case 3:
        if (profile.acknowledgement) {
          setSteps((prev) => prev + 1);
        } else {
          setAlert(-1);
          setAlertText(
            "Please acknowledge the onboarding documents to proceed"
          );
          setSteps((prev) => prev + 1);
        }
        break;
      case 4:
        if (user.firstLogin.payment) {
          setAlertText("Please complete the payment to proceed");
          setAlert(-1);
          setSteps((prev) => prev + 1);
        } else {
          setSteps((prev) => prev + 1);
        }
        break;
      case 5:
        onSubmit(profile);
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      {alert !== 0 && (
        <AlertContainer
          setShowAlert={setAlert}
          showAlert={alert}
          alertText={alertText}
        />
      )}
      <ProfileContainer className="flex">
        {renderProfileForm(steps, profile, setProfile)}
        {steps < 6 && (
          <ActionContainer>
            {steps > 0 && (
              <SecondaryButton onClick={handlePrevSteps}>
                {steps === 5 ? "Edit Profile" : "Previous"}
              </SecondaryButton>
            )}
            <MainButton onClick={handleNextSteps}>
              {steps === 5 ? "Create Profile" : "Next"}
            </MainButton>
          </ActionContainer>
        )}
      </ProfileContainer>
    </Container>
  );
}

export default CreateProfile;