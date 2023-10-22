import { Bathtub, KingBed } from "@mui/icons-material";
import { Typography, styled } from "@mui/material";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  overflow: "scroll",
});
const PropertyContainer = styled("div")({
  marginTop: "28px",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "28px",
});

const PropertyCard = styled("div")({
  width: "100%",
  maxWidth: "400px",
  background: "#ebeaea",
  borderRadius: "16px",
});

const Image = styled("div")({
  height: "150px",
  "& img": {
    borderRadius: "16px 16px 0 0",
  },
});

const CardBody = styled("div")({
  padding: '16px 20px'
});
type Props = {
  data: any[];
};
function PropertiesData(props: Props) {
  console.log("props: ", props)
  return (
    <Container>
      <PropertyContainer>
        {props.data.map((property: any, idx: any) => (
          <PropertyCard key={idx}>
            <Image>
              <img src={property.imgSrc} height="100%" width="100%" />
            </Image>
            <CardBody>
              <div className="flex">
                <Typography variant="subtitle1" fontWeight={600}>{property.address}</Typography>
                <div className="flex" style={{ gap: "8px" }}>
                  <div className="flex" style={{ flexDirection: "column", gap: '8px' }}>
                    <Typography>{property.bedrooms}</Typography>
                    <KingBed style={{color: '#A29181'}} />
                  </div>
                  <div className="flex" style={{ flexDirection: "column", gap: '8px' }}>
                    <Typography>{property.bathrooms}</Typography>
                    <Bathtub style={{color: '#A29181'}} />
                  </div>
                </div>
              </div>
            </CardBody>
          </PropertyCard>
        ))}
      </PropertyContainer>
    </Container>
  );
}

export default PropertiesData;
