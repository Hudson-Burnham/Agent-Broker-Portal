import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
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
import { MainButton, SecondaryButton } from "../../../Login/SignIn";
import { CheckCircle, Close } from "@mui/icons-material";
import { DocumentType } from "./DocDetails";

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
  // width: "30%",
  color: "white",
  ":hover": {
    boxShadow: "none",
  },
});
const DisagreeBtn = styled(SecondaryButton)({
  boxShadow: "none",
  // width: "30%",
  ":hover": {
    boxShadow: "none",
  },
});
type Props = {
  docList: DocumentType[];
  setDocList: Dispatch<SetStateAction<DocumentType[]>>;
  handlePdf: () => void;
};
function PDFViewer(props: Props) {
  const [action, setAction] = useState(false)
  useEffect(() => {
   console.log("doc list modified")
  }, [action])
  
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
                {Array.from(new Array(doc.numPages), (el, index) => (
                  <div
                    key={`page_${index + 1}_${el}`}
                    style={{ textAlign: "center" }}
                  >
                    <Page pageNumber={index + 1} />
                    <p style={{ fontSize: "12px" }}>
                      Page {index + 1} of {doc.numPages}
                    </p>
                  </div>
                ))}
              </Document>
            </DialogContent>
            <ActionContainer>
              <AgreeBtn
                onClick={() => {
                  let modifiedDocList = props.docList;
                  modifiedDocList[idx].acknowledged = true;
                  props.setDocList(modifiedDocList);
                  setAction(prev => !prev)
                }}
              >
                Agree
              </AgreeBtn>
              <DisagreeBtn
                onClick={() => {
                  let modifiedDocList = props.docList;
                  modifiedDocList[idx].acknowledged = false;
                  props.setDocList(modifiedDocList);
                  setAction(prev => !prev)
                }}
              >
                Disagree
              </DisagreeBtn>
            </ActionContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </Dialog>
  );
}

export default PDFViewer;
