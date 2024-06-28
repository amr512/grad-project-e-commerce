import { useState } from "react";
import "./App.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

function App() {
  const [count, setCount] = useState(0);
  // const stripe = useStripe();
  // const elements = useElements();
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!stripe || !elements) {
  //     return;
  //   }
  //   const { error, paymentIntent } = await stripe.confirmPayment({
  //     confirmParams: {
  //       return_url: "https://stripe.com",
  //     },
  //   });

  //   if (error) {
  //     console.log("[error]", error.message);
  //   } else if (paymentIntent) {
  //     console.log("[paymentIntent]", paymentIntent);
  //   }
  // };

  return (
    <>
      <div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
