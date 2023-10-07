import { FileUpload } from "@mui/icons-material";
import { Typography, styled } from "@mui/material";
import PDFViewer from "./PDFViewer";
import { useEffect, useState } from "react";
import { onboardingDocs } from "../../../../utils/constants";
import signPreview from "../../../../assets/sign-preview.svg";

export const InputContainer = styled("div")({
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
});
const SignContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "16px",
  marginBottom: "24px",
});
const SignInput = styled("div")({
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  gap: "8px",
  border: "2px dotted #d5d5d5",
  padding: "24px 16px",
  borderRadius: "8px",
  width: "100%",
  height: "100%",
});
const SignPreview = styled("div")({
  boxShadow: "5px 5px 10px #0b121d, -5px -5px 10px #0b121d",
  height: "150px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
//   const DocumentContainer = styled("div")({
//     display: "grid",
//     gap: "8px",
//     marginBottom: "24px",
//   });
export const Document = styled("div")({
  width: "100%",
  background: "#d5d5d5",
  borderRadius: "8px",
  padding: "20px 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export type DocumentType = {
  id: number;
  filePath: string;
  acknowledged: boolean;
  numPages: number;
};
export function DocDetails() {
  const [docsList, setDocList] = useState<DocumentType[]>(onboardingDocs);
  const [sign, setSign] = useState<FileList | null>(null);
  const [previewSign, setSignImage] = useState(signPreview);
  const [viewDoc, setViewDoc] = useState(false);
  const [acknowledgement, setAcknowledgement] = useState(false);
  const handleSignInput = (e: any) => {
    const sign = e.target.files;
    setSign(sign);
    setSignImage(URL.createObjectURL(sign[0] as any));
  };

  useEffect(() => {
    var allDocsAcknowledged = true;
    docsList.map((doc) => {
      if (!doc.acknowledged) {
        allDocsAcknowledged = false;
      }
    });
    if (acknowledgement !== allDocsAcknowledged) {
      setAcknowledgement(allDocsAcknowledged);
    }
  });

  const handleAcknowledgeDoc = () => {
    setViewDoc((prev) => !prev);
  };

  return (
    <div>
      {" "}
      <SignContainer>
        <SignInput>
          <FileUpload style={{ color: "#A29181", fontSize: "36px" }} />
          <Typography variant="h6" color={"#ffffff"} align="center">
            Upload your signature
          </Typography>

          <InputContainer>
            <input
              name="img"
              type="file"
              accept="image/*"
              onChange={handleSignInput}
              style={{ height: "100%", width: "100%" }}
            />
          </InputContainer>
        </SignInput>
        <SignPreview>
          <img src={previewSign} width={"100%"} height={"70%"} />
          {sign ? (
            ""
          ) : (
            <Typography color={"#d5d5d5"}>No signature uploaded</Typography>
          )}
        </SignPreview>
      </SignContainer>
      <input
        type="checkbox"
        onClick={handleAcknowledgeDoc}
        checked={acknowledgement}
      />
      {viewDoc && (
        <PDFViewer
          docList={docsList}
          setDocList={setDocList}
          handlePdf={() => setViewDoc((prev) => !prev)}
        />
      )}
    </div>
  );
}