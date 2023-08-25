import { ArticleOutlined, FileDownloadOutlined } from "@mui/icons-material";
import { IconButton, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";

type Props = {
  text?: string;
  prevUser: boolean;
  isUser: boolean;
  profileImg?: string;
  attachment?: any[];
};
const MessageBox = styled("div")({
  maxWidth: "max-content",
  display: "flex",
});
const AvatarBox = styled("div")({
  width: "50px",
});
const Avatar = styled("div")({
  background: "white",
  height: "36px",
  width: "36px",
  borderRadius: "50%",
});
const Doc = styled('div')({
  width: '250px', background: '#ffffff77', borderRadius: '8px',
  padding: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})
function MessageItem(props: Props) {
  const user : User = useSelector((state: State) => state.user) as User
  const attachment = props.attachment?.length ? props.attachment[0] : null;
  let attachmentSrc = "";
  let name=""
  let type = "TEXT";
  if (attachment) {
    type = attachment?.mimetype ? (attachment.mimetype.startsWith("image/") ? "IMG" : "DOC"): (attachment.type.startsWith('image/') ? 'IMG': 'DOC');
    name = attachment?.originalname ? attachment.originalname : attachment.name
    attachmentSrc = attachment?.buffer
      ? `data:${attachment?.mimetype};base64,${attachment?.buffer.toString(
          "base64"
        )}`
      : URL.createObjectURL(attachment);
  }

  const renderAttachment = (type: string) => {
    switch (type) {
      case "IMG":
        return (
          <div style={{ width: "300px", height: "200px", borderRadius: '8px'}}>
            <img src={attachmentSrc} height={"100%"} width={"100%"} style={{borderRadius: '8px'}} />
          </div>
        );
      case "DOC":
        return <Doc>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', flex: 1}}>
            <ArticleOutlined />
            <Typography className="message-contact-text" maxWidth={'150px'}>
              {name}
            </Typography>
          </div>
          <IconButton>
            <FileDownloadOutlined />
          </IconButton>
        </Doc>;
      default:
        return <></>;
    }
  };

  return (
    <MessageBox>
      <AvatarBox>
        {props.prevUser === props.isUser ? (
          ""
        ) : (
          <Avatar>
            <img
              src={props.isUser ? user.profileImage : props.profileImg}
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "50%" }}
            />
          </Avatar>
        )}
      </AvatarBox>
      <div style={{paddingTop: '4px'}}>
        {attachment ? renderAttachment(type) : ""}
        <Typography>{props.text}</Typography>
      </div>
    </MessageBox>
  );
}

export default MessageItem;