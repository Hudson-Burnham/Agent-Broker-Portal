import { Chip, Typography, styled } from "@mui/material";
import { useState } from "react";
import { categoryData } from "../../../../utils/constants";
import ResourceCard from "./ResourceCard";

const ResourceBox = styled("div")({
  color: "white",
  height: "100%",
  overflow: "auto",
  padding: '0 16px'
});
const Header = styled("div")({
  marginTop: '24px',
  background: "#2c2c76",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #5b66a9",
  padding: "16px 20px",
  borderRadius: "24px",
});
const Line = styled("div")({
  height: "2px",
  background: "#2c2c76",
  marginBottom: "16px",
});
const Category = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  paddingBottom: "32px",
});

function Resources() {
  const [category, setCategory] = useState("ALL");

  return (
    <ResourceBox>
      <Header>
        <Typography variant="h6" fontWeight={600}>
          HUDSON BURNHAM ACADEMY
        </Typography>
        <Typography variant="subtitle2">Social Media</Typography>
      </Header>
      <Typography
        variant="subtitle2"
        fontWeight={600}
        color={"white"}
        mt={5}
        mb={1}
      >
        Categories
      </Typography>
      <Line />
      <Category>
        {categoryData.map((item, i) => (
          <Chip
            key={i}
            label={item}
            variant={`${category === item ? "filled" : "outlined"}`}
            onClick={() => setCategory(() => item)}
            sx={{
              bgcolor: category === item ? "white" : "",
              color: category === item ? "" : "white",
              border: "1px solid white",
            }}
          />
        ))}
      </Category>
     <ResourceCard />
    </ResourceBox>
  );
}

export default Resources;