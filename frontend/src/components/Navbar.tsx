import { useContext, useEffect } from "react";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  console.log(mode);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  return (
    <main>
      <header>
        <ToastContainer position="bottom-center" limit={1} />
      </header>
      <body>
        <nav className="flex items-center justify-between bg-gray-500 p-4">
          <div className="text-white font-bold">
            <Link to="/">Zuke</Link>
          </div>
          <div>
            <button className="text-white mx-2">
              <Link to="/cart">
                Cart
                {cart.cartItems.length > 0 && (
                  <div className="text-xs">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </div>
                )}
              </Link>
            </button>
            {!userInfo ? (
              <button className="text-white mx-2">
                <Link to="/signin">Sign In</Link>
              </button>
            ) : (
              <button className="text-white mx-2" onClick={logout}>
                Sign Out
              </button>
            )}
            <button className="text-white mx-2" onClick={switchModeHandler}>
              Theme Switch
            </button>
          </div>
        </nav>
      </body>
    </main>
  );
};

export default Navbar;
