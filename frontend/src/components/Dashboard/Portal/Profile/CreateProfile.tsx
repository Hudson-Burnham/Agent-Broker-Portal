import { IconButton, Typography, styled } from "@mui/material";
import Form from "../../../Form/Form";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import TextInput from "../../../Form/TextInput";
import { MainButton } from "../../../Login/SignIn";
import { useState } from "react";
import PDFViewer from "./PDFViewer";
import {
  CheckCircle,
  Download,
  FileUpload,
  Visibility,
} from "@mui/icons-material";
import { editUser } from "../../../../axios";
import { setUser } from "../../../../store/action";
import signPreview from "../../../../assets/sign-preview.svg";
import { onboardingDocs } from "../../../../utils/constants";
import Payment from "./Payment";

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
  width: "600px",
  overflow: "auto",
});

const ImgContainer = styled("div")({
  position: "relative",
  borderRadius: "50%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
});
const Image = styled("img")({
  borderRadius: "50%",
  width: "135px",
  height: "135px",
});
const UploadContainer = styled("div")({
  position: "absolute",
  top: "75%",
  left: "70%",
  height: "26px",
  width: "26px",
});
const UploadButton = styled("div")({
  position: "relative",
  borderRadius: "50%",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const InputContainer = styled("div")({
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
});
const SubmitButton = styled(MainButton)({
  marginTop: "32px",
  color: "white",
  ":hover": {},
});
const SignContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "55% auto",
  gap: "16px",
  marginBottom: "24px",
});
const SignInput = styled("div")({
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  gap: "8px",
  border: "2px dotted #d5d5d5",
  padding: "24px 16px",
  borderRadius: "8px",
  width: "100%",
  height: "100%",
});
const SignPreview = styled("div")({
  boxShadow: "5px 5px 10px #0b121d, -5px -5px 10px #0b121d",
  height: "150px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
const DocumentContainer = styled("div")({
  display: "grid",
  gap: "8px",
  marginBottom: "24px",
});
const Document = styled("div")({
  width: "100%",
  background: "#d5d5d5",
  borderRadius: "8px",
  padding: "20px 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
type ProfileProps = {
  _id?: string;
  firstName: string;
  lastName: string;
  bio?: string;
  username: string;
  email: string;
};

type Document = {
  id: string,
  filePath: string,
  acknowledged: boolean;
}
function CreateProfile() {
  const user: User = useSelector((state: State) => state.user) as User;
  const dispatch = useDispatch();
  const [docsList, setDocList] = useState<Document[]>(onboardingDocs);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [sign, setSign] = useState<FileList | null>(null);
  const [previewSign, setSignImage] = useState(signPreview);
  const [viewDoc, setViewDoc] = useState(false);
  const [doc, setDoc] = useState("");
  const [profileImg, setProfileImg] = useState(
    "http://www.gravatar.com/avatar/?d=mp"
  );
  const defaultValues = {
    _id: user._id,
    firstName: "",
    lastName: "",
    bio: "",
    username: user.username,
    email:user.email,
  };
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("First Name is required"),
    lastName: Yup.string().trim().required("Last Name is required"),
    username: Yup.string().trim().required("Username is required"),
    email: Yup.string().trim().email().required("Email is required"),
  });

  const methods = useForm<ProfileProps>({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = async (data: ProfileProps) => {
    console.log(data, fileList);
    try {
      const formData = new FormData();
      formData.append("user_details", JSON.stringify(data));
      fileList && formData.append('files', fileList[0]);
      sign && formData.append('files', sign[0])
      await editUser(formData)
        .then((res) => {
          console.log(res);
          console.log("user details : ", res.data);
          dispatch(setUser(res.data));
        })
        .catch((error) => console.log(error));
    } catch (error) {
      reset();
      console.log(error);
    }
  };

  const handleProfileImage = (e: any) => {
    const image = e.target.files;
    setFileList(image);
    setProfileImg(URL.createObjectURL(image[0] as any));
  };

  const addSignatureToPdf = () => {
    //update the onboarding docs with the given signature image
  };

  const handlePayment = () => {
    //payment confirmation api
  }

  const handleSignInput = (e: any) => {
    const sign = e.target.files;
    setSign(sign);
    setDocList(onboardingDocs);
    setSignImage(URL.createObjectURL(sign[0] as any));
    addSignatureToPdf();
  };

  const handleViewDoc = (docPath: string) => {
    setDoc(docPath);
    setViewDoc((prev) => !prev);
  };

  return (
    <Container>
      <ProfileContainer>
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: "grid",
              gap: "16px",
              gridTemplateColumns: "30% auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImgContainer>
              <Image src={profileImg} />
              <UploadContainer>
                <UploadButton>
                  <IconButton
                    style={{
                      background: "#d5d5d5",
                      height: "100%",
                      width: "100%",
                      padding: 2,
                      border: "2px solid #A29181",
                    }}
                  >
                    <Typography mt={0.5} variant="h4" color={"#A29181"}>
                      &#43;
                    </Typography>
                  </IconButton>

                  <InputContainer>
                    <input
                      name="img"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImage}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </InputContainer>
                </UploadButton>
              </UploadContainer>
            </ImgContainer>
            <div>
              <TextInput
                name="username"
                placeholder="Enter your username"
                disabled
              />
              <TextInput
                name="email"
                type="email"
                placeholder="Enter your email"
                disabled
              />
            </div>
          </div>

          <TextInput name="firstName" placeholder="Enter your first name" />
          <TextInput name="lastName" placeholder="Enter your last name" />
          <TextInput name="bio" placeholder="Enter your bio..." multiline />
          <SignContainer>
            <SignInput>
              <FileUpload style={{ color: "#A29181" }} />
              <Typography variant="h6" color={"#ffffff"}>
                Upload your signature
              </Typography>

              <InputContainer>
                <input
                  name="img"
                  type="file"
                  accept="image/*"
                  onChange={handleSignInput}
                  style={{ height: "100%", width: "100%" }}
                />
              </InputContainer>
            </SignInput>
            <SignPreview>
              <img src={previewSign} width={"100%"} height={"70%"} />
              {sign ? (
                ""
              ) : (
                <Typography color={"#d5d5d5"}>No signature uploaded</Typography>
              )}
            </SignPreview>
          </SignContainer>
          <DocumentContainer>
            {docsList.map((doc) => (
              <Document key={doc.id}>
                <Typography>{doc.filePath.split("/").pop()}</Typography>
                <div style={{ display: "flex", gap: "8px" }}>
                  <IconButton
                    onClick={() => handleViewDoc(doc.filePath)}
                    sx={{ p: 0 }}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton sx={{ p: 0 }}>
                    <Download />
                  </IconButton>
                </div>
              </Document>
            ))}
          </DocumentContainer>
          {!user.firstLogin.payment ? (
            <Document style={{background: '#ffffff'}}>
              <IconButton sx={{p: 0}}>
                <CheckCircle style={{color: 'green'}} />
              </IconButton>
              <Typography variant="h6">Payment Completed</Typography>
            </Document>
          ) : (
            <>
            <Payment handlePayment={handlePayment} />
            </>

          )}
          <SubmitButton type="submit">Create Profile</SubmitButton>
        </Form>
      </ProfileContainer>
      {viewDoc && (
        <PDFViewer file={doc} handlePdf={() => setViewDoc((prev) => !prev)} />
      )}
    </Container>
  );
}

export default CreateProfile;