import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { MainButton, SecondaryButton } from "../../Login/SignIn";
import { useState } from "react";
import { CheckCircle, Close, Error } from "@mui/icons-material";

const Title = styled("div")({
  padding: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const FormContainer = styled("div")({
  width: "100%",
  background: "#ffffff",
  boxShadow: "5px 5px 10px #0b121d, -5px -5px 10px #0b121d",
  borderRadius: "24px",
  padding: "32px",
});
type Props = {
  handlePayment: () => void
}
function CheckoutForm(props: Props) {
  const [viewAmount, setViewAmount] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: any) => {
    console.log(stripe);
    console.log(elements);
    e.preventDefault();
    console.log(e);
    console.log("Hi I am stripe", stripe);
    console.log("Hi I am elements", elements);

    if (!stripe && !elements) {
      return;
    }
    console.log(stripe);
    console.log(elements);
    if (elements && stripe) {
      const { error } = await stripe?.confirmPayment({
        elements,
        confirmParams: {
        
          return_url: "https://househound.ai/main/search",
        },
      });
      if (error) {
        console.log("Payment not successful due to error : ", error);
        setMessage(`Payment Failed! ${error.message}`);
        setSuccess(false);
        setViewAmount(false);
        setCompleted(true);
      } else {
        console.log("Payment successful");
        setMessage("Payment Successful!");
        setSuccess(true);
        setViewAmount(false);
        setCompleted(true);
        setTimeout(() => {
          props.handlePayment()
        }, 1000)
      }
    }
  };
  const handleConfirmation = () => {
    setViewAmount((prev) => !prev);
  };
  return (
    <Container>
      <FormContainer id={"payment-form"} onSubmit={handleSubmit}>
        <PaymentElement />
        <MainButton
          onClick={handleConfirmation}
          style={{ color: "white", marginTop: "16px" }}
        >
          Pay Now
        </MainButton>
      </FormContainer>

      {completed && (
        <Dialog open={true} onClose={() => setCompleted(true)} PaperProps={{style: {
          width: '400px',
          padding: '32px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}}>
          {success ? (
            <CheckCircle style={{ fontSize: "88px", color: 'green' }} />
          ) : (
            <Error style={{ fontSize: "88px", color: 'red' }} />
          )}
          <Typography variant="h6">{message}</Typography>
        </Dialog>
      )}

      {viewAmount && (
        <Dialog
          open={true}
          onClose={handleConfirmation}
          PaperProps={{ style: { width: "600px", padding: "16px" } }}
        >
          <Title>
            <Typography variant="h4">Confirm the Payment</Typography>
            <IconButton onClick={handleConfirmation}>
              <Close />
            </IconButton>
          </Title>
          <DialogContent>
            <Typography variant="h6" fontWeight={600}>
              You are required to pay $50. Click on the confirm button to
              confirm the payment
            </Typography>
          </DialogContent>
          <DialogActions>
            <MainButton onClick={handleSubmit}>Confirm</MainButton>
            <SecondaryButton onClick={handleConfirmation}>
              Close
            </SecondaryButton>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}

export default CheckoutForm;
