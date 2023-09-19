import { dealsInfo, months, week } from "../../../../utils/constants";
import { useState } from "react";
import { MenuItem, Select, Typography, styled } from "@mui/material";
import DealsGraph from "./DealsGraph";

const SelectBox = styled("div")({
  borderRadius: "5px",
  display: "flex",
  background: "#F6F6F6",
});
const SelectComponent = styled(Select)({
  background: "#F6F6F6",
  ".MuiOutlinedInput-input": {
    padding: "9px 12px",
  },
  fieldset: {
    display: "none",
  },
});
const InfoWrapper = styled("div")({
  display: "flex",
  gap: "72px",
  padding: "30px 0",
});
function DealsInfo() {

  const [dealWeek, setWeek] = useState("Week");
  const [dealMonth, setMonth] = useState(months[new Date().getMonth()]);

  const handleChangeWeek = (e: any) => {
    setWeek(e.target.value);
  };
  const handleChangeMonth = (e: any) => {
    setMonth(e.target.value);
  };
  return (
    <>
      <div className="flex">
        <Typography>Deals</Typography>
        <SelectBox>
          <SelectComponent value={dealWeek} onChange={handleChangeWeek}>
            <MenuItem disabled value="Week">
              Week
            </MenuItem>
            {week.map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </SelectComponent>
          <SelectComponent
            style={{ background: "#A29181" }}
            value={dealMonth}
            onChange={handleChangeMonth}
          >
            {months.map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </SelectComponent>
        </SelectBox>
      </div>
      <InfoWrapper>
        {dealsInfo.map((info) => (
          <div key={info.id}>
            <Typography fontSize={"25px"} fontWeight={600}>
              {info.value}
            </Typography>
            <Typography>{info.month} deals</Typography>
          </div>
        ))}
      </InfoWrapper>
     <DealsGraph />
    </>
  );
}

export default DealsInfo;