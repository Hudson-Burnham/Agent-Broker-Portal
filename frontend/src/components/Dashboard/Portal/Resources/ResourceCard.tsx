import { LocalOffer, Person } from "@mui/icons-material";
import { Typography, styled } from "@mui/material";
import { resourcesData } from "../../../../utils/constants";

const CardContainer = styled("div")({
  display: 'flex',
  flexWrap: 'wrap',
  gap: "32px",
  marginBottom: '20px',
});
const Card = styled("div")({
  background: '#ebeaea',
  borderRadius: "8px",
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
  height: "100px",
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
  fontSize: "12px",
});
function ResourceCard() {
  return (
    <CardContainer>
      {resourcesData.map((item, i) => (
        <Card key={i}>
          <CardImg>
            <iframe src={item.url} height={"100%"} style={{borderRadius: '8px 8px 0 0 '}}></iframe>
          </CardImg>
          <CardBody>
            <Typography variant="subtitle1" color={'#131E30'} fontWeight={600}>
              {item.title}
            </Typography>
            <CardFooter>
              <FooterItems>
                <Person fontSize="inherit" style={{color: '#A29181'}} />
                <Typography fontSize="inherit">{item.author}</Typography>
              </FooterItems>
              <FooterItems>
                <LocalOffer fontSize="inherit" style={{color: '#A29181'}} />
                <Typography fontSize="inherit">{item.category}</Typography>
              </FooterItems>
            </CardFooter>
          </CardBody>
        </Card>
      ))}
    </CardContainer>
  );
}

export default ResourceCard;