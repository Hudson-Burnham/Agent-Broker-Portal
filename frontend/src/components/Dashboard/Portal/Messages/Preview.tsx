import { SummarizeOutlined } from "@mui/icons-material";
import { Tooltip, Typography, styled } from "@mui/material";

type Props = {
  file: FileList | null;
};
const Wrapper = styled("div")({
  background: "white",
  borderRadius: "16px",
  position: "absolute",
  bottom: "110%",
  padding: "24px",
  height: "160px",
  width: "160px",
  left: "2%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#1c1c3888",
});
function Preview(props: Props) {
  const name = props.file?.length ? props.file[0].name : "";
  return (
    <Wrapper>
      <Tooltip title={name} placement="right">
        <SummarizeOutlined style={{ fontSize: "80px" }} />
      </Tooltip>
      <Typography
        variant="subtitle2"
        className="message-contact-text"
        style={{ maxWidth: "120px" }}
      >
        {name}
      </Typography>
    </Wrapper>
  );
}

export default Preview;
