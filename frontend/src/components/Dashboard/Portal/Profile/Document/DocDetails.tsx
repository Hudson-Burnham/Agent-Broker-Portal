import { styled } from "@mui/material";
import PDFViewer from "./PDFViewer";
import { useEffect, useState } from "react";
import { onboardingDocs } from "../../../../../utils/constants";

export const InputContainer = styled("div")({
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
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

export function DocDetails() {
  const [docsList, setDocList] = useState<CustomDocumentType[]>(onboardingDocs);
  const [viewDoc, setViewDoc] = useState(false);
  const [acknowledgement, setAcknowledgement] = useState(false);

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