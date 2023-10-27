import { ArticleOutlined, FileDownloadOutlined } from "@mui/icons-material";
import { IconButton, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";

type Props = {
  text?: string;
  prevUser: boolean;
  isUser: boolean;
  profileImg?: string;
  attachment?: any[];
  username: string;
};
const MessageBox = styled("div")({
  maxWidth: "max-content",
  display: "flex",
  color: '#AED2D3'
});
const AvatarBox = styled("div")({
  width: "50px",
});
const Avatar = styled("div")({
  background: "white",
  height: "28px",
  width: "28px",
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
  console.log("message item props: ",props)

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

  const displayAvatar = (profileImage: any) => {
    profileImage = JSON.parse(JSON.stringify(profileImage))
    if(Array.isArray(profileImage) && profileImage.length) {
      return `data:${
        user.profileImage[0]?.mimetype
      };base64,${user.profileImage[0]?.buffer?.toString("base64")}`;
    }
    console.log("profile Image in display avatar", profileImage)

    return profileImage;
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
    <MessageBox style={{marginTop: (props.isUser === props.prevUser) ? '0px' : '16px'}}>
      <AvatarBox>
        {props.prevUser === props.isUser ? (
          ""
        ) : (
          <Avatar>
            <img
              src={displayAvatar(props.isUser ? user.profileImage : props.profileImg)}
              width={"100%"}
              height={"100%"}
              style={{ borderRadius: "50%" }}
            />
          </Avatar>
        )}
      </AvatarBox>
      <div style={{paddingTop: '4px'}}>
      {props.prevUser === props.isUser ? (
          ""
        ) : (
          <Typography variant="h6" mt={-1.5} mb={1} fontWeight={700} color="#fff">{props.username}</Typography>
        )}
        {attachment ? renderAttachment(type) : ""}
        <Typography>{props.text}</Typography>
      </div>
    </MessageBox>
  );
}

export default MessageItem;