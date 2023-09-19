import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import { MainButton, SecondaryButton } from "../../../Login/SignIn";
import { Close } from "@mui/icons-material";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Title = styled(DialogTitle)({
  borderBottom: '1px solid #d5d5d5',
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const ActionContainer = styled(DialogActions)({
  borderTop: '1px solid #d5d5d5',
  padding: "20px 24px",
  display: "flex",
  justifyContent: "space-between",
});
const AgreeBtn = styled(MainButton)({
  boxShadow: "none",
  width: "30%",
  color: "white",
  ":hover": {
    boxShadow: "none",
  },
});
const DisagreeBtn = styled(SecondaryButton)({
  boxShadow: "none",
  width: "30%",
  ":hover": {
    boxShadow: "none",
  },
});
type Props = {
  file: string;
  handlePdf: () => void;
};
function PDFViewer(props: Props) {
  const [previewFile, setPreviewFile] = useState<File | string>();
  const [numPages, setNumPages] = useState<number>();

  useEffect(() => {
    setPreviewFile(props.file);
    console.log("Preview file in pdf viewer", previewFile, props.file);
  }, []);

  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: PDFDocumentProxy) => {
    setNumPages(nextNumPages);
  };
  return (
    <Dialog
      open={true}
      hideBackdrop
      PaperProps={{ style: { borderRadius: "20px" } }}
      onClose={props.handlePdf}
    >
      <Title>
        {props.file.split('/').pop()}
        <IconButton sx={{ p: 0 }} onClick={props.handlePdf}>
          <Close />
        </IconButton>
      </Title>
      <DialogContent style={{ height: "500px", width: "600px" }}>
        <Document file={previewFile} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <div key={`page_${index + 1}_${el}`} style={{textAlign: 'center'}}>
              <Page
                pageNumber={index + 1}
                width={600}
              />
              <p style={{fontSize: '12px'}}>
                Page {index + 1} of {numPages}
              </p>
            </div>
          ))}
        </Document>
      </DialogContent>
      <ActionContainer>
        <AgreeBtn>Agree</AgreeBtn>
        <DisagreeBtn>Disagree</DisagreeBtn>
      </ActionContainer>
    </Dialog>
  );
}

export default PDFViewer;