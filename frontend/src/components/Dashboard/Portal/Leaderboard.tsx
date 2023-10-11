import {
  CircularProgress,
  Pagination,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLeaderboardData } from "../../../axios";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  gap: "19px",
  padding: "40px 20px",
  fontSize: "20px",
  fontWeight: 400,
});
const Table = styled("div")({
  display: "grid",
  border: "1px solid #d5d5d5",
  position: "relative",
  "& .head": {
    backgroundColor: "#A29181",
    color: "#fff",
  },
  "@media screen and (max-width: 991px)": {
    overflow: "auto",
  },
});
const Row = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  "@media screen and (max-width: 991px)": {
    gridAutoColumns: "minmax(150px, 1fr)",
    gridTemplateColumns: "repeat(3, minmax(150px, 1fr))",
    overflow: "visible",
  },
});
const Cell = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  border: "1px solid #d5d5d5",
  borderStyle: "none solid solid none",
  "&:first-of-type": {
    justifyContent: "flex-start",
  },
});
const columns = ["Deal Owner", "Closed Won Deals", "Amount(in $)"];
export default function Leaderboard() {
  const user: User = useSelector((state: State) => state.user) as User;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const fetchLeaderboardData = async () => {
    await getLeaderboardData()
      .then((res) => {
        console.log(res.data);
        setDeals(res.data.deals);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const handleChange = (e: any, value: number) => {
    console.log(e);
    setPage(value);
  };
  return (
    <Container>
      <div className="flex" style={{marginBottom: '20px'}}>
        <Typography style={{ color: "#131E30", fontSize: "25px" }}>
          Leaderboard
        </Typography>
        <Typography style={{ color: "#6F6F6F" }}>{user.email}</Typography>
      </div>
      <div>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Table>
              <Row className="head">
                {columns.map((item, idx) => (
                  <Cell key={idx}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item}
                    </Typography>
                  </Cell>
                ))}
              </Row>
              {deals
                .slice((page - 1) * 10, (page - 1) * 10 + 9)
                .map((deal: any, idx: any) => (
                  <Row key={idx}>
                    <Cell>
                      <Typography variant="body1">
                        {typeof deal.owner === "object"
                          ? `${deal.owner.firstName} ${deal.owner.lastName}`
                          : deal.owner}
                      </Typography>
                    </Cell>
                    <Cell>
                      <Typography variant="body1">{deal?.dealsData?.length}</Typography>
                    </Cell>
                    <Cell>
                      <Typography variant="body1">{Math.ceil(deal?.amount)}</Typography>
                    </Cell>
                  </Row>
                ))}
            </Table>

            <Pagination
              count={Math.ceil(deals.length / 10)}
              page={page}
              onChange={handleChange}
              size="large"
              sx={{
                marginTop: '40px',
                display: 'flex',
                justifyContent: 'center'
              }}
            />
          </>
        )}
      </div>
    </Container>
  );
}