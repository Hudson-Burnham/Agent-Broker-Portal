import { InputAdornment, Tooltip, styled } from "@mui/material";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { MessageForm, Props } from "./MessageList";
import { AttachFile, SentimentSatisfiedAlt, Send } from "@mui/icons-material";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { actionsList } from "../../../../utils/constants";
import { sendMessage } from "../../../../axios";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Preview from "./Preview";

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

// const ChannelRow = styled("div")({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   width: "100%", // Ensure the row uses the full width.
//   paddingBottom: "10px", // Space below the row
// });

// const RightElements = styled("div")({
//   display: "flex",
//   alignItems: "center",
//   gap: "10px", // Giving space between elements
//   position: "relative",
// });

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

// const AvatarCountLabel = styled("span")({
//   fontFamily: "'Futura Md BT', sans-serif",
//   fontSize: "16px",
//   fontWeight: 400,
//   lineHeight: "25px",
//   color: "#FFFFFF",
// });

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

// const Dropdown = styled("select")({
//   backgroundColor: "transparent", // Setting background of dropdown to transparent
//   color: "#FFFFFF", // Setting color of the text in dropdown
//   fontFamily: "'Futura Md BT', sans-serif", // Ensure the font is available or add a fallback
//   fontSize: "20px",
//   fontWeight: 400,
//   lineHeight: "25px",
//   border: "none", // Removing the border
//   outline: "none",

//   "&:focus": {
//     outline: "none", // Remove the focus outline when dropdown is focused
//   },

//   "& option": {
//     // Targeting the child option elements of the dropdown
//     backgroundColor: "transparent", // Setting background of options to transparent
//     color: "#FFFFFF", // Setting color of the text in options
//     fontFamily: "'Futura Md BT', sans-serif",
//     fontSize: "20px",
//     fontWeight: 400,
//     lineHeight: "25px",
//   },
// });

const DividerRow = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%", // Ensure the row uses the full width.
});
const Input = styled(TextField)({
  borderRadius: "24px",
  "& input": {
    padding: "16px 4px",
  },
  "& fieldset": {
    display: "none",
  },
});
const AttachmentList = styled("div")({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  bottom: "110%",
  gap: "8px",
});

const IconStyle = styled(IconButton)({
  padding: "10px",
  background: "#2f3b8088",
  color: "#2f3b80",
  ":hover": {
    background: "#2f3b80",
    color: "#abb6f888",
  },
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
  // height: "140px",
  backgroundColor: "#222529",
  margin: "20px", // margin on both sides
  marginTop: "auto",
  borderRadius: "15px",
  border: "0.5px solid #9C9C9C",
  display: "flex",
  alignItems: "center", // to vertically center the content
  justifyContent: "space-between", // to distribute the content (input and tools)
  padding: "10px 10px", // padding on the left and right side inside the chat input box
  // Removed absolute positioning properties (bottom, left, right)
});

// // Add a styled component for the TextField, ensuring the border is removed
// const StyledTextField = styled(TextField)({
//   "& .MuiOutlinedInput-root": {
//     border: "none",
//     boxShadow: "none",
//   },
//   "& .MuiOutlinedInput-notchedOutline": {
//     border: "none",
//   },
// });

export default function StartChatNew(props: Props) {
  const user: User = useSelector((state: State) => state.user) as User;
  const messageRef = useRef<HTMLDivElement>();
  const [message, setMessage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [attachment, setAttachment] = useState(false);
  const [preview, setPreview] = useState(false);
  const [prevChat, setPrevChat]: any = useState(null);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleEmojiPicker = () => {
    setEmojiPicker((prev) => !prev);
  };
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    if (prevChat && prevChat?._id !== props.chat._id) {
      setEmojiPicker(() => false);
      setFileList(null);
      setPreview(false);
      setAttachment(false);
    }

    setPrevChat(props.chat);
  }, [props.messages]);

  const handleEmojiInput = (emoji: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  };
  const handleShowAttachment = () => {
    setPreview(false);
    setAttachment((prev) => !prev);
  };
  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files);
    setPreview(true);
    setAttachment(false);
  };
  const handleSendMessage = async () => {
    if (message.length > 0 || fileList) {
      setMessage("");
      setPreview(false);
      const data = new FormData();
      const files = fileList ? [...fileList] : [];
      files.forEach((file) => {
        data.append(`file`, file);
      });

      data.append(
        "data",
        JSON.stringify({
          chatId: props.chat._id,
          sender: user._id,
          text: message,
        })
      );

      setFileList(null);

      const newMessage: Message = {
        chatId: props.chat,
        sender: user,
        text: message,
        attachment: files,
      };
      props.handleMessageList(newMessage);
      await sendMessage(data).then((res) => {
        if (res.status) {
          console.log("Message Sent");
        }
      });
    }
  };
  console.log(props.messages);
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  };
  return (
    <Container>
      <TopSection>
        <EmailRow>
          <EmailLabel>{user.email}</EmailLabel>
        </EmailRow>

        {/* <ChannelRow>
          <Dropdown>
            <option># Channel 1</option>
            <option># Channel 2</option>
            <option># Channel 3</option>
            {/* Add other channels here */}
        {/* </Dropdown>
          <RightElements>
            <Avatar src={avatar1} style={{ zIndex: 4 }} />
            <Avatar src={avatar2} style={{ zIndex: 3 }} />
            <Avatar src={avatar3} style={{ zIndex: 2 }} />
            <Avatar src={avatar4} style={{ zIndex: 1 }} />
            <AvatarCountLabel>+3</AvatarCountLabel>
            <AddPersonButton>Add Person</AddPersonButton>
          </RightElements>
        </ChannelRow> */}

        <DividerRow>
          <DividerLine />
          <DateLabel>Date</DateLabel>
          <DividerLine />
        </DividerRow>
      </TopSection>

      <BottomSection>
        {props.messages.map((message, idx) => (
          <MessageContainer>
            {(idx === 0
              ? !(message.sender._id === user._id)
              : props.messages[idx - 1].sender._id === user._id) ===
            (user._id === message.sender._id) ? (
              ""
            ) : (
              <MessageRow>
                <MessageAvatar src={message.sender.profileImage} />
                <UserDetails>
                  <UsernameLabel>
                    {user._id === message.sender._id ? "You" : props.chat.name}
                  </UsernameLabel>
                  <TimestampLabel>
                    {formatDate(message.createdAt as string)}
                  </TimestampLabel>
                </UserDetails>
              </MessageRow>
            )}

            <MessageText>{message.text}</MessageText>
          </MessageContainer>
        ))}

        <ChatInputBox>
          <MessageForm>
            {preview && <Preview file={fileList} />}

            <Input
              placeholder="Enter your message"
              value={message}
              InputProps={{
                style: { color: "#6F7173" },
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      style={{ position: "relative" }}
                      onClick={handleShowAttachment}
                    >
                      <AttachFile style={{ color: "#9FA1A2" }} />
                    </IconButton>
                    {attachment && (
                      <AttachmentList>
                        {actionsList.map((action) => (
                          <Tooltip
                            key={action.id}
                            title={action.text}
                            placement="right"
                          >
                            <IconStyle>
                              {action.image}
                              <input
                                type="file"
                                accept={action.accept}
                                onChange={handleAttachment}
                                style={{
                                  opacity: 0,
                                  position: "absolute",
                                  width: "100%",
                                }}
                              />
                            </IconStyle>
                          </Tooltip>
                        ))}
                      </AttachmentList>
                    )}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleEmojiPicker}>
                      <SentimentSatisfiedAlt style={{ color: "#9FA1A2" }} />
                    </IconButton>
                    {emojiPicker && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "110%",
                          right: "2%",
                        }}
                      >
                        <EmojiPicker onEmojiClick={handleEmojiInput} />
                      </div>
                    )}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
            />
            <IconButton onClick={handleSendMessage}>
              <Send style={{ color: "#9FA1A2" }} />
            </IconButton>
          </MessageForm>
          {/* <StyledTextField
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
          /> */}
        </ChatInputBox>
      </BottomSection>
    </Container>
  );
}
