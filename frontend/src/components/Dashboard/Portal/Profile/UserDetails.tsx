import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InputContainer } from "./Document/DocDetails";
import { IconButton, Typography, styled } from "@mui/material";
import { Input } from "../../../Form/TextInput";
import { ImgContainer, Image } from "./ReviewProfile";

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
export const TextInputContainer = styled(Input)({
  margin: "8px 0",
  width: "100%",
});

export type CreateProfileProps = {
  profile: any;
  setProfile: Dispatch<SetStateAction<any>>;
};

export function UserDetails(props: CreateProfileProps) {
  const [profileImage, setProfileImage] = useState<any>();
  useEffect(() => {
    const profileImage = props.profile.profileImage;
    console.log("in useeffect", profileImage);
    if (Array.isArray(profileImage)) {
      const type = profileImage[0].mimetype;
      const buffer = profileImage[0].buffer;
      console.log(profileImage[0].mimetype);
      console.log(profileImage[0].buffer);
      setProfileImage(`data:${type};base64,${buffer.toString("base64")}`);
    } else {
      setProfileImage("http://www.gravatar.com/avatar/?d=mp");
    }
  }, []);

  const handleProfileImage = (e: any) => {
    const image = e.target.files;
    let profile = props.profile;
    profile.profileImage = image;
    setProfileImage(URL.createObjectURL(image[0] as any))
    props.setProfile(profile);
  };
  return (
    <div>
      {" "}
      <ImgContainer>
        <Image src={profileImage} />
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
        <TextInputContainer
          name="username"
          value={props.profile.username}
          disabled
        />
        <TextInputContainer name="email" value={props.profile.email} disabled />
      </div>
    </div>
  );
}

export function UserNewDetails(props: CreateProfileProps) {
  return (
    <div>
      <TextInputContainer
        name="firstName"
        value={props.profile.firstName}
        onChange={(e) => {
          const updatedProfile = { ...props.profile };
          updatedProfile.firstName = e.target.value;
          props.setProfile(updatedProfile);
        }}
        placeholder="Enter your first name"
      />
      <TextInputContainer
        name="lastName"
        value={props.profile.lastName}
        onChange={(e) => {
          const updatedProfile = { ...props.profile };
          updatedProfile.lastName = e.target.value;
          props.setProfile(updatedProfile);
        }}
        placeholder="Enter your last name"
      />
    </div>
  );
}

export function AdditionalDetails(props: CreateProfileProps) {
  return (
    <TextInputContainer
      name="bio"
      value={props.profile.bio}
      onChange={(e) => {
        const updatedProfile = { ...props.profile };
        updatedProfile.bio = e.target.value;
        props.setProfile(updatedProfile);
      }}
      placeholder="Enter your bio..."
      rows={4}
      multiline
    />
  );
}
