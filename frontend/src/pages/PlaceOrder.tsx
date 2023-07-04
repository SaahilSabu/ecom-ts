import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useCreateOrderMutation } from "../hooks/orderHook";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";

export default function PlaceOrder() {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });
      dispatch({ type: "CART_CLEAR" });
      localStorage.removeItem("cartItems");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <div className="flex flex-wrap">
        <div className="w-full md:w-8/12">
          <div className="mb-3">
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Name:</strong> {cart.shippingAddress.fullName}
                <br />
                <strong>Address:</strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </p>
              <Link to="/shipping" className="text-blue-500 hover:underline">
                Edit
              </Link>
            </div>
          </div>

          <div className="mb-3">
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-xl font-semibold mb-4">Payment</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
              <Link to="/payment" className="text-blue-500 hover:underline">
                Edit
              </Link>
            </div>
          </div>

          <div className="mb-3">
            <div className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-xl font-semibold mb-4">Items</h2>
              <ul className="divide-y divide-gray-200">
                {cart.cartItems.map((item) => (
                  <li key={item._id} className="py-4">
                    <div className="flex items-center">
                      <div className="w-1/2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full rounded thumbnail"
                        />
                        <Link
                          to={`/product/${item.slug}`}
                          className="text-blue-500 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="w-1/4">
                        <span>{item.quantity}</span>
                      </div>
                      <div className="w-1/4">${item.price}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <Link to="/cart" className="text-blue-500 hover:underline">
                Edit
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full md:w-4/12">
          <div className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-2">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>${cart.itemsPrice.toFixed(2)}</span>
                </div>
              </li>
              <li className="py-2">
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${cart.shippingPrice.toFixed(2)}</span>
                </div>
              </li>
              <li className="py-2">
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${cart.taxPrice.toFixed(2)}</span>
                </div>
              </li>
              <li className="py-2">
                <div className="flex justify-between">
                  <strong>Order Total</strong>
                  <strong>${cart.totalPrice.toFixed(2)}</strong>
                </div>
              </li>
              <li className="py-2">
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0 || isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Place Order
                  </button>
                </div>
                {isLoading && <LoadingBox></LoadingBox>}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
