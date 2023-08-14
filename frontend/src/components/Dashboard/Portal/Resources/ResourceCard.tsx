import { LocalOffer, Person } from "@mui/icons-material";
import { Typography, styled } from "@mui/material";
import { resourcesData } from "../../../../utils/constants";

const CardContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "16px",
});
const Card = styled("div")({
  border: "2px solid #5b66a9",
  borderRadius: "16px",
});
const CardImg = styled("div")({
  height: "200px",
  "& img": {
    borderRadius: "16px 16px 0 0",
  },
});
const CardBody = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "180px",
  borderRadius: "0 0 16px 16px",
  padding: "16px 10px",
});
const CardFooter = styled("div")({
  marginTop: "auto",
  display: "flex",
  gap: "8px",
  textTransform: "uppercase",
});
const FooterItems = styled("div")({
  display: "flex",
  gap: "4px",
  alignItems: "center",
  fontSize: "10px",
});
function ResourceCard() {
  return (
    <CardContainer>
     {resourcesData.map((item, i) => (
          <Card key={i}>
            <CardImg>
              <img src={item.img} width="100%" height="100%" />
            </CardImg>
            <CardBody>
              <Typography variant="subtitle1" fontWeight={600}>
                {item.title}
              </Typography>
              <CardFooter>
                <FooterItems>
                  <Person fontSize="inherit" />

                  <Typography fontSize="inherit">{item.author}</Typography>
                </FooterItems>
                <FooterItems>
                  <LocalOffer fontSize="inherit" />

                  <Typography fontSize="inherit">{item.category}</Typography>
                </FooterItems>
              </CardFooter>
            </CardBody>
          </Card>
        ))}
    </CardContainer>
  )
}

export default ResourceCard