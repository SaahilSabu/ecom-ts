import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { useContext } from "react";
import { CartItem } from "../types/Cart";
import { toNamespacedPath } from "path";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

type Props = {};

const Bag = (props: Props) => {
  const navigate = useNavigate();
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const updateCartHandler = async (item: CartItem, quantity: number) => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div className="flex">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="w-2/3 mt-20 ml-20">
        <h1 className="font-bold text-3xl">YOUR BAG</h1>
        <h6 className="font-light text-xl my-2">
          Your items aren’t reserved, checkout quickly to make sure you don’t
          miss out.
        </h6>
        <div className="flex">
          <div className="w-8/12">
            {cartItems.length === 0 ? (
              <div className="mb-4">
                <MessageBox>
                  Cart is empty. <Link to="/">Go Shopping</Link>
                </MessageBox>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item: CartItem) => (
                  <div key={item._id} className="p-4 bg-white rounded shadow">
                    <div className="flex items-center">
                      <div className="w-4/12">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full rounded img-thumbnail"
                        />
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </div>
                      <div className="w-3/12">
                        <button
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                          className="px-3 py-2 bg-slate-200 rounded-md"
                          disabled={item.quantity === 1}
                        >
                          <FontAwesomeIcon icon={faMinusCircle} />
                        </button>{" "}
                        <span>{item.quantity}</span>{" "}
                        <button
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                          className="px-3 py-2 bg-slate-200 rounded-md"
                        >
                          <FontAwesomeIcon icon={faPlusCircle} />
                        </button>
                      </div>
                      <div className="w-3/12">${item.price}</div>
                      <div className="w-2/12">
                        <button
                          onClick={() => removeItemHandler(item)}
                          className="px-3 py-2 bg-slate-200 rounded-md"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/3 mx-3">
        <div className="p-4 bg-white rounded shadow">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items):
              $
              {cartItems
                .reduce((a, c) => a + c.price * c.quantity, 0)
                .toFixed(2)}
            </h3>
          </div>
          <div>
            <button
              className="px-3 py-2 bg-slate-200 rounded-md"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bag;
