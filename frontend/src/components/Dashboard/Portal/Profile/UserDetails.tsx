import { Dispatch, SetStateAction } from "react";
import { InputContainer } from "./DocDetails";
import { IconButton, Typography, styled } from "@mui/material";
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
  margin: "8px 0",
  width: "100%",
});

type Props = {
  profile: any;
  setProfile: Dispatch<SetStateAction<any>>;
};

export function UserDetails(props: Props) {
  const user: User = useSelector((state: State) => state.user) as User;

  //   const [fileList, setFileList] = useState<FileList | null>(null);

  const handleProfileImage = (e: any) => {
    const image = e.target.files;
    // setFileList(image);
    props.setProfile({
      profileImage: URL.createObjectURL(image[0] as any),
    });
  };
  return (
    <div>
      {" "}
      <ImgContainer>
        <Image src={props.profile.profileImage} />
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

export function UserNewDetails(props: Props) {
  return (
    <div>
      <TextInput
        name="firstName"
        value={props.profile.firstName}
        onChange={(e) => {
            const updatedProfile = {...props.profile}
            updatedProfile.firstName = e.target.value
            props.setProfile(updatedProfile)
        }}
        placeholder="Enter your first name"
      />
      <TextInput
        name="lastName"
        value={props.profile.lastName}
        onChange={(e) => {
            const updatedProfile = {...props.profile}
            updatedProfile.lastName = e.target.value
            props.setProfile(updatedProfile)
        }}
       
        placeholder="Enter your last name"
      />
    </div>
  );
}

export function AdditionalDetails(props: Props) {
  return (
      <TextInput
        name="bio"
        value={props.profile.bio}
        onChange={(e) => {
            const updatedProfile = {...props.profile}
            updatedProfile.bio = e.target.value
            props.setProfile(updatedProfile)
        }}
        placeholder="Enter your bio..."
        rows={4}
        multiline
      />
  );
}
