import { CheckCircle } from "@mui/icons-material"
import { IconButton, Typography, styled } from "@mui/material"
import { useSelector } from "react-redux";
import Payment from "./Payment";

export const Document = styled("div")({
  width: "100%",
  background: "white",
  borderRadius: "8px",
  padding: "8px 12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
function PaymentDetails() {
  const user: User = useSelector((state: State) => state.user) as User;
  console.log(user)
  console.log("HI user in payment details", user, user?.firstLogin?.payment)

  const handlePayment = () => {
    //payment confirmation api
  }

  return !user?.firstLogin?.payment ? (
        <Document style={{background: '#ffffff'}}>
          <IconButton sx={{p: 0}}>
            <CheckCircle style={{color: 'green'}} />
          </IconButton>
          <Typography variant="h6">Payment Completed</Typography>
        </Document>
      ) : (
        <>
        <Payment handlePayment={handlePayment} />
        </>
      )
}

export default PaymentDetails