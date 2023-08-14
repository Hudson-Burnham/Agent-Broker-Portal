import { styled } from "@mui/material"

const Container = styled('div')({
    background: '#808dd6',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
})
function NoConversation() {
  return (
    <Container>No Conversations. Select a chat</Container>
  )
}

export default NoConversation