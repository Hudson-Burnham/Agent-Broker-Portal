import { Typography, styled } from "@mui/material";
import PDFViewer from "./PDFViewer";
import { useEffect, useState } from "react";
import { onboardingDocs } from "../../../../../utils/constants";
import { CreateProfileProps } from "../UserDetails";

export const InputContainer = styled("div")({
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
});


export function DocDetails(props: CreateProfileProps) {
  const [docsList, setDocList] = useState<CustomDocumentType[]>(onboardingDocs);
  const [viewDoc, setViewDoc] = useState(false);
  const [acknowledge, setAcknowledge] = useState(props.profile.acknowledgement);
  useEffect(() => {
    var allDocsAcknowledged = true;
    docsList.map((doc) => {
      if (!doc.acknowledged) {
        allDocsAcknowledged = false;
      }
    });
    if (props.profile.acknowledgement !== allDocsAcknowledged) {
      let profile = props.profile;
      profile.acknowledgement = allDocsAcknowledged;
      props.setProfile(profile);
      setAcknowledge(allDocsAcknowledged);
    }
  });

  const handleAcknowledgeDoc = () => {
    setViewDoc((prev) => !prev);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <input
          style={{ marginTop: "6px" }}
          type="checkbox"
          onClick={handleAcknowledgeDoc}
          checked={acknowledge}
        />
        <Typography variant="subtitle1" color="white" mb={2}>
          Please click on the checkbox to preview, sign and acknowledge the
          onboarding documents.
        </Typography>
      </div>

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
