import { styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MainButton, SecondaryButton } from "../../../Login/SignIn";
import {  Dispatch, SetStateAction, useState } from "react";
import { editUser } from "../../../../axios";
import { setUser } from "../../../../store/action";
import { AdditionalDetails, UserDetails, UserNewDetails } from "./UserDetails";
import { DocDetails } from "./DocDetails";
import PaymentDetails from "./PaymentDetails";
import AlertContainer from "../../../Login/AlertContainer";
import { ReviewProfile, SuccessContainer } from "./ReviewProfile";

const Container = styled("div")({
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
  boxShadow: "20px 20px 60px #c4c4c4, -20px -20px 60px #c4c4c4",
  borderRadius: "24px",
  padding: "40px 44px",
  width: "500px",
  overflow: "auto",
  flexDirection: "column",
});
const ActionContainer = styled("div")({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "12px",
  margin: "8px 0",
});

const renderProfileForm = (steps: number, profile: any, setProfile: Dispatch<SetStateAction<any>>) => {
  switch (steps) {
    case 0:
      return <UserDetails profile={profile} setProfile={setProfile} />;
    case 1:
      return <UserNewDetails profile={profile} setProfile={setProfile} />;
    case 2:
      return <AdditionalDetails profile={profile} setProfile={setProfile} />;
    case 3:
      return <DocDetails />;
    case 4:
      return <PaymentDetails />;
    case 5: 
      return <ReviewProfile />
    default: 
      return <SuccessContainer />
    // default: return <SuccessContainer />
  }
};
function CreateProfile() {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(0);
  const [alertText, setAlertText] = useState("")
  const [steps, setSteps] = useState(0);
  const user: User = useSelector((state: State) => state.user) as User;

  const [profile, setProfile] = useState({
    profileImage: user.profileImage,
    firstName: "",
    lastName: "",
    bio: "",
    email: user.email,
    username: user.username
  });

  const onSubmit = async (data: any) => {
    // console.log(data, fileList);
    try {
      const formData = new FormData();
      formData.append("user_details", JSON.stringify(data));
      // fileList && formData.append('files', fileList[0]);
      // sign && formData.append('files', sign[0])
      await editUser(formData)
        .then((res) => {
          console.log(res);
          console.log("user details : ", res.data);
          dispatch(setUser(res.data));
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevSteps = () => {
    setAlert(0)
    setSteps((prev) => prev - 1);
  };

  const handleNextSteps = () => {
    setAlert(0)
    switch (steps) {
      case 0:
        setSteps((prev) => prev + 1);
        break;
      case 1:
        console.log(profile)
        console.log(profile.firstName, profile.lastName)
        if (!profile.firstName.length || !profile.lastName.length) {
          setAlert(-1)
          setAlertText('Please provide the given below details to proceed')
        } else {
          setSteps(prev => prev+1)
        }
        break;
      case 2:
        setSteps((prev) => prev + 1);
        break;
      case 3:
        setSteps((prev) => prev + 1);
        break;
      case 4:
        if(user.firstLogin.payment) {
          setAlertText('Please complete the payment to proceed')
          setAlert(-1)
          setSteps((prev) => prev+1);

        } else {
          setSteps((prev) => prev+1);
        }
        break;
      case 5:
        setSteps((prev) => prev + 1);
        break;
      default:
        onSubmit(steps);
    }
  };

  return (
    <Container>
      {alert !== 0 &&
       <AlertContainer
       setShowAlert={setAlert}
       showAlert={alert}
       alertText={alertText}
     />
      }
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