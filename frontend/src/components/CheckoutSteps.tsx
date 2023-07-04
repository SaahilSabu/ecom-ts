export default function CheckoutSteps(props: {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
}) {
  return (
    <div className="flex">
      <div
        className={`flex-1 text-blue-500 w-14 bg-slate-200 ${
          props.step1 ? "text-orange-500" : ""
        }`}
      >
        Sign-In
      </div>
      <div
        className={`flex-1 text-blue-500 w-14 bg-slate-200 ${
          props.step2 ? "text-orange-500" : ""
        }`}
      >
        Shipping
      </div>
      <div
        className={`flex-1 text-blue-500 w-14 bg-slate-200 ${
          props.step3 ? "text-orange-500" : ""
        }`}
      >
        Payment
      </div>
      <div
        className={`flex-1 text-blue-500 w-14 bg-slate-200 ${
          props.step4 ? "text-orange-500" : ""
        }`}
      >
        Place Order
      </div>
    </div>
  );
}
