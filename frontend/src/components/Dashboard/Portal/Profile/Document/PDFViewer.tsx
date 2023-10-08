import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { pdfjs, Document } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import "swiper/css/bundle";

import { Pagination, Navigation } from "swiper/modules";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from "@mui/material";
import { MainButton, SecondaryButton } from "../../../../Login/SignIn";
import { CheckCircle, Close } from "@mui/icons-material";
import { PdfDocument } from "./PdfDocument";
import AlertContainer from "../../../../Login/AlertContainer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Title = styled(DialogTitle)({
  borderBottom: "1px solid #d5d5d5",
});
const ActionContainer = styled(DialogActions)({
  borderTop: "1px solid #d5d5d5",
  padding: "20px 24px",
  display: "flex",
});
const AgreeBtn = styled(MainButton)({
  boxShadow: "none",
  color: "white",
  ":hover": {
    boxShadow: "none",
  },
});
const DisagreeBtn = styled(SecondaryButton)({
  boxShadow: "none",
  ":hover": {
    boxShadow: "none",
  },
});
type Props = {
  docList: CustomDocumentType[];
  setDocList: Dispatch<SetStateAction<CustomDocumentType[]>>;
  handlePdf: () => void;
};
function PDFViewer(props: Props) {
  const [action, setAction] = useState(false);
  const [alert, setAlert] = useState(0);
  const [alertText, setAlertText] = useState("");
  useEffect(() => {
    console.log("doc list modified");
  }, [action]);

  const handleDocList = (idx: number, type: string, value: any) => {
    let modifiedDocList = props.docList;
    if (type === "acknowledged" && value === true) {
      setAlert(0)
      if (!modifiedDocList[idx].signature.length) {
        setAlert(-1);
        setAlertText("Cannot Acknowledge the document before signing it.");
        return;
      }
    }
    if (
      type === "id" ||
      type === "filePath" ||
      type === "acknowledged" ||
      type === "numPages" ||
      type === "signature"
    ) {
      (modifiedDocList[idx][type] as any) = value;
      console.log(modifiedDocList[idx][type]);
    }
    props.setDocList(modifiedDocList);
  };

  return (
    <Dialog
      open={true}
      hideBackdrop
      PaperProps={{ style: { borderRadius: "20px" } }}
      onClose={props.handlePdf}
    >
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        {props.docList.map((doc, idx) => (
          <SwiperSlide key={doc.id}>
            <Title className="flex">
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {doc.filePath.split("/").pop()}
                <CheckCircle
                  color={doc.acknowledged ? "success" : "disabled"}
                />
              </div>
              <IconButton sx={{ p: 0 }} onClick={props.handlePdf}>
                <Close />
              </IconButton>
            </Title>
            <DialogContent style={{ height: "360px", width: "600px" }}>
              <Document file={doc.filePath} onLoadError={console.error}>
                <PdfDocument
                  doc={doc}
                  idx={idx}
                  handleDocList={handleDocList}
                />
              </Document>
            </DialogContent>
            <ActionContainer>
              <AgreeBtn
                onClick={() => {
                  handleDocList(idx, "acknowledged", true);
                  setAction((prev) => !prev);
                }}
              >
                Agree
              </AgreeBtn>
              <DisagreeBtn
                onClick={() => {
                  handleDocList(idx, "acknowledged", false);
                  setAction((prev) => !prev);
                }}
              >
                Disagree
              </DisagreeBtn>
            </ActionContainer>
          </SwiperSlide>
        ))}
      </Swiper>

      {alert && (
        <AlertContainer
          showAlert={alert}
          setShowAlert={setAlert}
          alertText={alertText}
        />
      )}
    </Dialog>
  );
}

export default PDFViewer;
