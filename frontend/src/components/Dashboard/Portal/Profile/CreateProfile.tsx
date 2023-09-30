import { IconButton, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "../../../Form/TextInput";
import { MainButton, SecondaryButton } from "../../../Login/SignIn";
import { Dispatch, SetStateAction, useState } from "react";
import { editUser } from "../../../../axios";
import { setUser } from "../../../../store/action";
import { AdditionalDetails, UserDetails, UserNewDetails } from "./UserDetails";
import { DocDetails } from "./DocDetails";
import PaymentDetails from "./PaymentDetails";
import AlertContainer from "../../../Login/AlertContainer";

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
  // height: "540px",
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

const renderProfileForm = (steps: number) => {
  switch (steps) {
    case 0:
      return <UserDetails />;
    case 1:
      return <UserNewDetails />;
    case 2:
      return <AdditionalDetails />;
    case 3:
      return <DocDetails />;
    case 4:
      return <PaymentDetails />;
    // default: return <SuccessContainer />
  }
};
function CreateProfile() {
  const dispatch = useDispatch();
  const [doc, setDoc] = useState("");
  const [alert, setAlert] = useState(-1);
  const [steps, setSteps] = useState(0);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    bio: "",
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
        if (!profile.firstName || !profile.lastName) {
          setAlert(-1)
        } else {
          setSteps(prev => prev+1)
        }
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      default:
        onSubmit(steps);
    }
  };
  //submit the form
  const addSignatureToPdf = () => {
    //update the onboarding docs with the given signature image
  };

  return (
    <Container>
      {alert !== 0 &&
       <AlertContainer
       setShowAlert={setAlert}
       showAlert={alert}
       alertText={"Please submit the given below details to proceed"}
     />
      }
      
      <ProfileContainer className="flex">
        {renderProfileForm(steps)}
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