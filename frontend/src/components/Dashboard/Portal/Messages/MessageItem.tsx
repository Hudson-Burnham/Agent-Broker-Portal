import { styled } from "@mui/material";

type Props = {
  text: string;
  isUser: boolean;
  profileImg?: string
}
const MessageBox = styled('div')({
  maxWidth: '400px',
  padding: '6px 8px',
  borderRadius: '8px',
  background: 'white'
})
function MessageItem(props: Props) {
  return (
    <MessageBox style={{margin: !props.isUser?'0 auto 0 0':'0 0 0 auto'}}>
      {props.text}
    </MessageBox>
  )
}

export default MessageItem