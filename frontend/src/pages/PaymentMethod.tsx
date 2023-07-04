import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";

export default function PaymentMethod() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "PayPal"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <input
              type="radio"
              id="PayPal"
              className="form-radio h-4 w-4 text-blue-500"
              value="PayPal"
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="PayPal" className="ml-2">
              PayPal
            </label>
          </div>
          <div className="mb-3">
            <input
              type="radio"
              id="Stripe"
              className="form-radio h-4 w-4 text-blue-500"
              value="Stripe"
              checked={paymentMethodName === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="Stripe" className="ml-2">
              Stripe
            </label>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
