import { Message, Notifications, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, styled } from "@mui/material";

const Box = styled("div")({
  margin: "0 350px 0 225px",
  width: "100%",
  height: "100vh",
  padding: "28px 36px",
});
const Header = styled("div")({
  display: "flex",
  gap: '8px'
});
const SearchComponent = styled(TextField)({
  border: "1px solid #131E3244",
  borderRadius: "12px",
  "& input": {
    padding: "12px 6px",
  },
  "& fieldset": {
    display: "none",
  },
});
const HeaderIcon = styled(IconButton)({
    borderRadius: '8px',
    border: '1px solid #131E3244'
})

export default function Portal() {
  return (
    <Box>
      <Header>
        <SearchComponent
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          fullWidth
          placeholder="Search here ..."
        />
        <HeaderIcon>
            <Notifications />
        </HeaderIcon>
        <HeaderIcon>
            <Message />
        </HeaderIcon>
      </Header>
    </Box>
  );
}