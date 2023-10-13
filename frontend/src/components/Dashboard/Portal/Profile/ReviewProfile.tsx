import { IconButton, Typography, styled } from "@mui/material";
import { CreateProfileProps, TextInputContainer } from "./UserDetails";
import { Document } from "./Payment/PaymentDetails";
import { CheckCircle } from "@mui/icons-material";
import { useState, useEffect } from "react";

export const ImgContainer = styled("div")({
  position: "relative",
  borderRadius: "50%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
});
export const Image = styled("img")({
  borderRadius: "50%",
  width: "135px",
  height: "135px",
});

export function ReviewProfile(props: CreateProfileProps) {
  const [profileImage, setProfileImage] = useState<any>(
    props.profile.profileImage
  );
  useEffect(() => {
    const profileImage = props.profile.profileImage;
    if (Array.isArray(profileImage)) {
      setProfileImage(
        profileImage[0]?.buffer
          ? `data:${
              profileImage[0]?.mimetype
            };base64,${profileImage[0]?.buffer.toString("base64")}`
          : URL.createObjectURL(profileImage[0])
      );
    }
  }, []);
  return (
    <div>
      <ImgContainer>
        <Image src={profileImage} />
      </ImgContainer>
      <TextInputContainer
        name="username"
        value={props.profile.username}
        disabled
      />
      <TextInputContainer name="email" value={props.profile.email} disabled />
      <TextInputContainer
        name="firstName"
        value={props.profile.firstName}
        disabled
      />
      <TextInputContainer
        name="lastName"
        value={props.profile.lastName}
        disabled
      />
      {props.profile.bio && (
        <TextInputContainer
          name="bio"
          value={props.profile.bio}
          rows={2}
          disabled
          multiline
        />
      )}

      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <input style={{ marginTop: "6px" }} type="checkbox" checked={true} />
        <Typography variant="subtitle1" color="white" mb={2}>
          Please click on the checkbox to preview, sign and acknowledge the
          onboarding documents.
        </Typography>
      </div>
      <Document>
        <IconButton sx={{ p: 0 }}>
          <CheckCircle style={{ color: "green" }} />
        </IconButton>
        <Typography variant="subtitle1" color={"#A29181"}>
          Payment Completed
        </Typography>
      </Document>
    </div>
  );
}
