import { Typography, styled } from "@mui/material";
import avatar1 from "../../../../assets/images/avatars/avatar_1.png";
import avatar2 from "../../../../assets/images/avatars/avatar_2.png";
import avatar3 from "../../../../assets/images/avatars/avatar_3.png";
import avatar4 from "../../../../assets/images/avatars/avatar_4.png";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoIcon from "@mui/icons-material/Photo";
import AttachFileIcon from "@mui/icons-material/AttachFile";

// ... other imports as needed

const Container = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  padding: "20px",
  backgroundColor: "#1A1D21",
});

const TopSection = styled("div")({
  height: "25%",
  display: "flex",
  flexDirection: "column",
  width: "100%", // Ensure the section uses the full width of its parent.
  marginTop: "36px",

  paddingBottom: "24px", // Padding at the bottom for some spacing.
});

const EmailRow = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "24px",
  paddingBottom: "10px", // Space below the email
});
const EmailLabel = styled("div")({
  fontFamily: "'Futura Bk BT', sans-serif", // Ensure the font is available or add a fallback like 'sans-serif'
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "25px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "#6F6F6F",
});

const ChannelRow = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%", // Ensure the row uses the full width.
  paddingBottom: "10px", // Space below the row
});

const RightElements = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px", // Giving space between elements
  position: "relative",
});

const Avatar = styled("img")({
  borderRadius: "50%",
  width: "35px", // Assuming a diameter of 70px (2 * 35px radius)
  height: "35px",
  marginLeft: "-25px", // Makes each avatar overlap the previous one by 50%
  zIndex: 1, // Ensure it overlaps other content
  "&:first-child": {
    marginLeft: "0", // Ensure the first avatar doesn't have negative margin
  },
});

const AvatarCountLabel = styled("span")({
  fontFamily: "'Futura Md BT', sans-serif",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "25px",
  color: "#FFFFFF",
});

const MessageAvatar = styled(Avatar)({
  // Reusing the Avatar styled component and adjusting the size
  width: "55px",
  height: "55px",
  marginRight: "10px",
});

const UsernameLabel = styled("span")({
  fontFamily: "'Futura Md BT', sans-serif",
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "25px",
  color: "#FFFFFF",
  marginRight: "20px", // Adding some spacing between the username and timestamp
});

const UserDetails = styled("div")({
  display: "flex",
  alignItems: "center",
});

const TimestampLabel = styled("span")({
  fontFamily: "'Futura Lt BT', sans-serif",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "25px",
  color: "#AED2D3",
  margin: "10px 0",
});

const MessageText = styled("p")({
  fontFamily: "'Futura Lt BT', sans-serif",
  fontSize: "18px",
  fontWeight: 400,
  lineHeight: "25px",
  color: "#AED2D3",
  margin: "10px 0", // Adding some top and bottom spacing for the message text
  paddingLeft: "65px",
  width: "70%",
});

const Dropdown = styled("select")({
  backgroundColor: "transparent", // Setting background of dropdown to transparent
  color: "#FFFFFF", // Setting color of the text in dropdown
  fontFamily: "'Futura Md BT', sans-serif", // Ensure the font is available or add a fallback
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "25px",
  border: "none", // Removing the border
  outline: "none",

  "&:focus": {
    outline: "none", // Remove the focus outline when dropdown is focused
  },

  "& option": {
    // Targeting the child option elements of the dropdown
    backgroundColor: "transparent", // Setting background of options to transparent
    color: "#FFFFFF", // Setting color of the text in options
    fontFamily: "'Futura Md BT', sans-serif",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "25px",
  },
});

const AddPersonButton = styled("button")({});

const DividerRow = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%", // Ensure the row uses the full width.
});

const DividerLine = styled("hr")({
  flex: 1,
  borderColor: "#B8B8B8",
  borderWidth: "0.5px", // Setting the border width to 0.5px
  borderStyle: "solid",
  height: 0,
  margin: 0,
});

const DateLabel = styled("span")({
  display: "inline-block",
  width: "145px",
  height: "32px",
  lineHeight: "32px", // To center the text vertically
  textAlign: "center", // To center the text horizontally
  borderWidth: "1px", // You can adjust this as necessary
  borderStyle: "solid", // Specify the border style
  borderRadius: "15px",
  borderColor: "#B8B8B8",
  color: "#B8B8B8", // Assuming the text color is white against the gray background
  margin: "0 10px", // Add space between the divider lines and the date
  padding: "0 10px",
});

const BottomSection = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%", // Ensure the section uses the full width of its parent.
  alignItems: "stretch", // Make sure the children (flex items) stretch across the full width.
});

const MessageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%", // Ensure it takes up the full width.
});

const MessageRow = styled("div")({
  // The container div for the avatar and texts
  display: "flex",
  alignItems: "center", // To vertically center the items
});

const ChatInputBox = styled("div")({
  height: "140px",
  backgroundColor: "#222529",
  margin: "20px", // margin on both sides
  borderRadius: "15px",
  border: "0.5px solid #9C9C9C",
  display: "flex",
  alignItems: "center", // to vertically center the content
  justifyContent: "space-between", // to distribute the content (input and tools)
  padding: "0 15px", // padding on the left and right side inside the chat input box
  // Removed absolute positioning properties (bottom, left, right)
});

// Add a styled component for the TextField, ensuring the border is removed
const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    border: "none",
    boxShadow: "none",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

export default function StartChatNew() {
  return (
    <Container>
      <TopSection>
        <EmailRow>
          <EmailLabel>kelly@gmail.com</EmailLabel>
        </EmailRow>

        <ChannelRow>
          <Dropdown>
            <option># Channel 1</option>
            <option># Channel 2</option>
            <option># Channel 3</option>
            {/* Add other channels here */}
          </Dropdown>
          <RightElements>
            <Avatar src={avatar1} style={{ zIndex: 4 }} />
            <Avatar src={avatar2} style={{ zIndex: 3 }} />
            <Avatar src={avatar3} style={{ zIndex: 2 }} />
            <Avatar src={avatar4} style={{ zIndex: 1 }} />
            <AvatarCountLabel>+3</AvatarCountLabel>
            <AddPersonButton>Add Person</AddPersonButton>
          </RightElements>
        </ChannelRow>

        <DividerRow>
          <DividerLine />
          <DateLabel>2 September 2023</DateLabel>
          <DividerLine />
        </DividerRow>
      </TopSection>

      <BottomSection>
        <MessageContainer>
          <MessageRow>
            <MessageAvatar src={avatar1} />
            <UserDetails>
              <UsernameLabel>David</UsernameLabel>
              <TimestampLabel>10:00am</TimestampLabel>
            </UserDetails>
          </MessageRow>
          <MessageText>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos cumque
            pariatur quas itaque eaque sed, dicta neque commodi maxime sunt
            voluptate! Minima numquam iusto omnis quas odio illum, cumque
            dignissimos eum? Saepe sequi dolore fuga debitis expedita sunt illo
            deleniti enim soluta rerum nulla facere voluptatum non, at dolorem?
            Debitis, aliquid iste. Molestias deserunt quae eaque accusantium
            dolores labore tempore.
          </MessageText>
        </MessageContainer>

        <ChatInputBox>
          <StyledTextField
            fullWidth
            placeholder="Send Message # Channel 1"
            variant="outlined"
            InputProps={{
              style: {
                backgroundColor: "transparent",
                borderColor: "transparent", // Remove the inner border
                borderRadius: "10px",
                color: "#6F7173", // Hint text color
              },
              startAdornment: (
                <IconButton size="small" edge="start">
                  <EmojiEmotionsIcon style={{ color: "#9FA1A2" }} />
                </IconButton>
              ),
              endAdornment: (
                <div>
                  <IconButton size="small" edge="end">
                    <CameraAltIcon style={{ color: "#9FA1A2" }} />
                  </IconButton>
                  <IconButton size="small" edge="end">
                    <PhotoIcon style={{ color: "#9FA1A2" }} />
                  </IconButton>
                  <IconButton size="small" edge="end">
                    <AttachFileIcon style={{ color: "#9FA1A2" }} />
                  </IconButton>
                </div>
              ),
            }}
          />
        </ChatInputBox>
      </BottomSection>
    </Container>
  );
}
