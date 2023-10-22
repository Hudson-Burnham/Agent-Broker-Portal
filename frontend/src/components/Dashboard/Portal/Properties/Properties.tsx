import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Pagination,
  Slider,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import PropertiesData from "./PropertiesData";
import { SearchComponent } from "../MainDashboard/MainDashboard";
import { Search } from "@mui/icons-material";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  gap: "19px",
  padding: "40px 20px",
  fontSize: "20px",
  fontWeight: 400,
  flex: 1,
});

export default function Properties() {
  const user: User = useSelector((state: State) => state.user) as User;
  const [propertyData, setPropertyData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const searchObject: any = {
    location: "santa monica",
    status_type: "ForSale",
    home_type: "Houses",
    minPrice: 0,
    maxPrice: "any price",
    rentMinPrice: 0,
    rentMaxPrice: "any price",
    sort: "",
  };

  const handleSearch = async (currentPage = 0) => {
    setLoading(true);
    let options: any = {
      method: "GET",
      url: "https://zillow-com1.p.rapidapi.com/propertyExtendedSearch",
      params: {
        location: location.length ? location : searchObject.location,
        status_type: searchObject.status_type,
        home_type: "Houses",
        isAuction: false,
        sort:
          searchObject.status_type === "ForSale"
            ? "Homes_for_You"
            : "Verified_Source",
      },
      headers: {
        "X-RapidAPI-Key": "8ed83f5685msh07680ee9a434eb3p1cc0f6jsnf0f2f90011da",
        "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com",
      },
    };

    if (currentPage > 0) {
      options.params.page = currentPage;
    }

    if (searchObject.status_type === "ForSale") {
      options.params.maxPrice = price;
    }
    if (searchObject.status_type === "ForRent") {
      options.params.rentMaxPrice = price;
    }

    if (searchObject.bedsMin && searchObject.bedsMin !== "any") {
      options.params.bedsMin = searchObject.bedsMin;
    }

    if (searchObject.bedsMax && searchObject.bedsMax !== "any") {
      options.params.bedsMax = searchObject.bedsMax;
    }

    if (searchObject.bathsMin) {
      options.params.bathsMin = searchObject.bathsMin;
    }

    if (searchObject.bathsMax) {
      options.params.bathsMax = searchObject.bathsMax;
    }

    if (searchObject.sort) {
      options.params.sort = searchObject.sort;
    }

    try {
      const response = await axios.request(options);
      console.log(response);
      setPropertyData([]);
      if (response.data.props && response.data.props.length > 0) {
        setPropertyData(response.data.props);
        setTotal(response.data.totalResultCount);
        setCurrentPage(response.data.currentPage);
      }

      if (!response.data.totalResultCount) {
        setPropertyData([]);
        setTotal(0);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleChange = async (e: any) => {
    setLocation(e.target.value);
    await handleSearch(currentPage);
  };

  const handlePrice = async (e: any) => {
    setPrice(e.target.value);
    await handleSearch(currentPage);
  };

  const handlePagination = async (e: any, page: number) => {
    console.log(e);
    setCurrentPage(page);
    await handleSearch(page);
  };

  return (
    <Container>
      <div className="flex" style={{ marginBottom: "20px", flex: 1 }}>
        <Typography style={{ color: "#131E30", fontSize: "25px" }}>
          Search
        </Typography>
        <Typography style={{ color: "#6F6F6F" }}>{user.email}</Typography>
      </div>
      <div className="flex">
        <SearchComponent
          style={{ width: "500px" }}
          placeholder="Address, city, school, postal code, building..."
          onChange={handleChange}
          value={location}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton sx={{ p: 0 }}>
                  <Search style={{ color: "#000000" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Pagination
          count={Math.ceil(total / 41)}
          page={currentPage}
          onChange={handlePagination}
          size="small"
        />
      </div>
      <div style={{display: 'flex', gap: '12px'}}>
        <Slider
          key={`slider-${price}`}
          min={0}
          value={price}
          step={10000}
          max={10000000}
          onChange={handlePrice}
          valueLabelDisplay="on"
          style={{ width: "40%" }}
        />
        <Typography variant="body1" fontWeight={600}>Max Price</Typography>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <PropertiesData data={propertyData} />
          </>
        )}
      </div>
    </Container>
  );
}
