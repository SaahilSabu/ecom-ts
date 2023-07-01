import React, { useContext, useEffect } from "react";
import { Store } from "../Store";

const Navbar = () => {
  const {
    state: { mode },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);


  console.log(mode)

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  return (
    <nav className="flex items-center justify-between bg-gray-500 p-4">
      <div className="text-white font-bold">Zuke</div>
      <div>
        <button className="text-white mx-2">Sign Out</button>
        <button className="text-white mx-2">Cart</button>
        <button className="text-white mx-2">Sign In</button>
        <button className="text-white mx-2" onClick={switchModeHandler}>
          Theme Switch
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
