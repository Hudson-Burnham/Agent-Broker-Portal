import {
  AttachFile,
  Send,
  SentimentSatisfiedAlt,
} from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  styled,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../../../../axios";
import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Preview from "./Preview";
import { actionsList } from "../../../../utils/constants";

const MessageSection = styled("div")({
  background: "#abb6f8",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflow: "auto",
});
const ListSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflow: "scroll",
  padding: "20px 16px",
  paddingTop: 0
});
const MessageForm = styled("div")({
  position: "relative",
  marginTop: "auto",
  background: "#ffffff88",
  display: "flex",
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

type Props = {
  chat: Chat;
  messages: Message[];
  handleMessageList: (message: Message) => void;
};
function MessageList(props: Props) {
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
  return (
    <MessageSection>
      <ListSection>
        {props.messages.map((message, idx, messageArr) => (
          <MessageItem
            key={idx}
            text={message.text}
            prevUser={
              idx === 0
                ? !(message.sender._id === user._id)
                : messageArr[idx - 1].sender._id === user._id
            }
            isUser={message.sender._id === user._id}
            attachment={message?.attachment}
            profileImg={message.sender.profileImage}
          />
        ))}
        <div ref={(el) => (messageRef.current = el as HTMLDivElement)}></div>
      </ListSection>
      <MessageForm>
        {preview && <Preview file={fileList} />}

        <Input
          placeholder="Enter your message"
          value={message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  style={{ position: "relative" }}
                  onClick={handleShowAttachment}
                >
                  <AttachFile />
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
                  <SentimentSatisfiedAlt />
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
          <Send />
        </IconButton>
      </MessageForm>
    </MessageSection>
  );
}
export default MessageList;