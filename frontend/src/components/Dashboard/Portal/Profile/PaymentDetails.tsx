import { CheckCircle } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import Payment from "./Payment";
import { Document } from "./DocDetails";


function PaymentDetails() {
  const user: User = useSelector((state: State) => state.user) as User;
  console.log("HI user in payment details", user, user.firstLogin.payment)

  const handlePayment = () => {
    //payment confirmation api
  }

  return !user.firstLogin.payment ? (
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