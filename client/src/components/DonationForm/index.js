import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";

const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    // Send the paymentMethod.id to your server to complete the payment
    // You can make an API request using your preferred HTTP client library

    // Replace 'YOUR_SERVER_ENDPOINT' with the actual server endpoint to handle the payment on the server side
    const response = await fetch("/YOUR_SERVER_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
    });

    if (response.ok) {
      // Payment successful, redirect to a success page
      history.push("/success");
    } else {
      // Payment failed, display error message
      const data = await response.json();
      setErrorMessage(data.error);
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h2 className="title">Make a Donation</h2>
        <form className="box" onSubmit={handleSubmit}>
          {/* CardElement component from Stripe */}
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />

          {errorMessage && <p className="has-text-danger">{errorMessage}</p>}

          <button
            className="button is-primary"
            type="submit"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : "Donate"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
