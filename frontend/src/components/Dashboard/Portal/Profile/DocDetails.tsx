import { Download, FileUpload, Visibility } from "@mui/icons-material";
import { IconButton, Typography, styled } from "@mui/material";
import PDFViewer from "./PDFViewer";
import { useState } from "react";
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
  const DocumentContainer = styled("div")({
    display: "grid",
    gap: "8px",
    marginBottom: "24px",
  });
 export const Document = styled("div")({
    width: "100%",
    background: "#d5d5d5",
    borderRadius: "8px",
    padding: "20px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });
  
type DocumentType = {
    id: string,
    filePath: string,
    acknowledged: boolean;
  }
export function DocDetails () {
    const [docsList, setDocList] = useState<DocumentType[]>(onboardingDocs);
    const [fileList, setFileList] = useState<FileList | null>(null);
    const [sign, setSign] = useState<FileList | null>(null);
    const [previewSign, setSignImage] = useState(signPreview);
    const [viewDoc, setViewDoc] = useState(false);
    const [doc, setDoc] = useState("");
    const handleSignInput = (e: any) => {
        const sign = e.target.files;
        setSign(sign);
        // setDocList(onboardingDocs);
        setSignImage(URL.createObjectURL(sign[0] as any));
        // addSignatureToPdf();
      };
      
  const handleViewDoc = (docPath: string) => {
    setDoc(docPath);
    setViewDoc((prev) => !prev);
  };
    
    return <>  <SignContainer>
    <SignInput>
      <FileUpload style={{ color: "#A29181", fontSize: '36px' }} />
      <Typography variant="h5" color={"#ffffff"} align="center">
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
   {/* <DocumentContainer>
   {docsList.map((doc) => (
     <Document key={doc.id}>
       <Typography>{doc.filePath.split("/").pop()}</Typography>
       <div style={{ display: "flex", gap: "8px" }}>
         <IconButton
           onClick={() => handleViewDoc(doc.filePath)}
           sx={{ p: 0 }}
         >
           <Visibility />
         </IconButton>
         <IconButton sx={{ p: 0 }}>
           <Download />
         </IconButton>
       </div>
     </Document>
   ))}
  </DocumentContainer> */}
   {viewDoc && (
        <PDFViewer file={doc} handlePdf={() => setViewDoc((prev) => !prev)} />
      )}
  </>
}