import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { createPayment } from "../../../../axios";
import { useState, useEffect } from "react";

const STRIPE_PUBLISHABLE_KEY = "pk_test_51N8Uz0DEGU8ZQT0oBMi0Bsa3d33G8DwsO0pN8DLvajWYz4vlpVuY5bIAXiaLMbPAxWwCTqcwQsjOHbGVzUFZeL0c00gJxX6Jja";
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  type Props = {
    handlePayment: () => void
  }
function Payment(props: Props) {
  const [clientSecret, setClientSecret] = useState(null)
  const fetchPayments = async() => {
    await createPayment().then((res) => {
      setClientSecret(res.data.client_secret)
    }).catch((error) => console.log(error))
  }
  useEffect(() => {
    fetchPayments()
  },[])

  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{clientSecret: clientSecret}}>
          <CheckoutForm handlePayment={props.handlePayment} />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
