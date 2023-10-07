import { CheckCircle, Edit } from "@mui/icons-material";
import { IconButton, TextField, styled } from "@mui/material";
import { useState } from "react";
import { Page } from "react-pdf";

const Input = styled(TextField)({
  float: "left",
  padding: 0,
});
type Props = {
  doc: CustomDocumentType;
  idx: number;
  handleDocList: (idx: number, type: string, value: any) => void;
};
export function PdfDocument(props: Props) {
  const [editSignature, setEdit] = useState(false);
  const [sign, setSign] = useState(props.doc.signature);

  const handleChange = (e: any) => {
    const currentSign = e.target.value;
    setSign(currentSign);
    props.handleDocList(props.idx, "signature", currentSign);
  };
  return (
    <>
      {Array.from(new Array(props.doc.numPages), (el, index) => (
        <div key={`page_${index + 1}_${el}`} style={{ textAlign: "center" }}>
          <Page pageNumber={index + 1} />
          {index + 1 === props.doc.numPages ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Input
                placeholder="Enter your signature"
                type="text"
                className="signature"
                sx={{
                  ".MuiInputBase-input": {
                    fontFamily: "Shadows Into Light !important",
                    fontWeight: "900!important",
                    width: "max-content",
                  },

                  "& fieldset": {
                    display: editSignature ? 'inline-block' : "none",
                  },
                }}
                inputProps={{
                  style: {
                    padding: "4px 2px",
                    fontSize: "22px",
                  },
                }}
                value={sign}
                onChange={editSignature ? handleChange : () => {}}
              />
              <div style={{ float: "left", display: "flex", gap: "8px" }}>
                Signature
                <IconButton
                  sx={{ p: 0 }}
                  onClick={() => {
                    console.log("Hi I am clicked");
                    setEdit((prev) => !prev);
                  }}
                >
                  {editSignature ? (
                    <CheckCircle color="success" />
                  ) : (
                    <Edit color="primary" />
                  )}
                </IconButton>
              </div>
            </div>
          ) : (
            <></>
          )}

          <p style={{ fontSize: "12px" }}>
            Page {index + 1} of {props.doc.numPages}
          </p>
        </div>
      ))}
    </>
  );
}
