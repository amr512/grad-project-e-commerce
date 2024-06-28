import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ProductsPage from "./pages/ProductsPage.jsx";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)
// const verificationSession = await (await stripePromise).identity.verificationSessions.create({
//   type:"id_number"
// })

// const options = {
//   clientSecret: verificationSession.client_secret,
  
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Elements stripe={stripePromise} options={options}> */}
      <ProductsPage />
    {/* </Elements> */}
  </React.StrictMode>
);
