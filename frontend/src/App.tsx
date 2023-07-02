import { Link, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="">
        <Navbar />
        <div className="mt-12">
          {/* Add margin-top to create space below the navbar */}
          <Outlet />
        </div>
    </div>
  );
}

export default App;
