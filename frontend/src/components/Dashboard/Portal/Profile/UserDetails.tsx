import { useState } from "react";
import { InputContainer } from "./DocDetails";
import { IconButton, TextField, Typography, styled } from "@mui/material";
import { MainButton } from "../../../Login/SignIn";
import { useSelector } from "react-redux";
import { Input } from "../../../Form/TextInput";

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
const TextInput = styled(Input)({
    margin: '8px 0',
    width: '100%'
})
const SubmitButton = styled(MainButton)({
  marginTop: "32px",
  color: "white",
  ":hover": {},
});

type Props = {};
export function UserDetails(props: Props) {
  const user: User = useSelector((state: State) => state.user) as User;

  const [profileImg, setProfileImg] = useState(user.profileImage);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleProfileImage = (e: any) => {
    const image = e.target.files;
    setFileList(image);
    setProfileImg(URL.createObjectURL(image[0] as any));
  };
  return (
    <div>
      {" "}
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
        <TextInput name="username" value={user.username} disabled />
        <TextInput name="email" value={user.email} disabled />
      </div>
    </div>
  );
}

export function UserNewDetails() {
  return (
    <div>
      <TextInput name="firstName" placeholder="Enter your first name" />
      <TextInput name="lastName" placeholder="Enter your last name" />
    </div>
  );
}

export function AdditionalDetails() {
  return (
    <div>
      <Input name="bio" placeholder="Enter your bio..." multiline />
    </div>
  );
}
