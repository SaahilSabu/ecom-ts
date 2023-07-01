import React from "react";
import { Link, Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="">
      <Navbar />
      <div className="mt-12"> {/* Add margin-top to create space below the navbar */}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
