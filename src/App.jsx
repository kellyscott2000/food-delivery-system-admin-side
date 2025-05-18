import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Orders from "./pages/Orders/Orders";
import Menu from "./pages/Menu/Menu";
import Categories from "./pages/Categories/Categories";
import Customers from "./pages/Customers/Customers";
import Coupons from "./pages/Coupons/Coupons";
import { useState } from "react";
import AddMenuPopUp from "./components/AddMenuPopUp/AddMenuPopUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";

const App = () => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to check if the token is expired
    const checkTokenExpiration = () => {
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      const currentTime = new Date().getTime();

      if (tokenExpiration && currentTime > tokenExpiration) {
        // If token has expired, remove token and navigate to login page
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiration");
        navigate("/login"); // Redirect to login page
      }
    };

    // Check token expiration every time the app renders or on an interval
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 1000 * 60); // Check every minute

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <>
                <ToastContainer />
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <Dashboard />
                </div>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <ToastContainer />
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <Orders />
                </div>
              </>
            }
          />
          <Route
            path="/menu"
            element={
              <>
                <ToastContainer />
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <Menu setShowAddMenu={setShowAddMenu} />
                </div>
              </>
            }
          />
          <Route
            path="/categories"
            element={
              <>
                <ToastContainer />
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <Categories />
                </div>
              </>
            }
          />
          <Route
            path="/customers"
            element={
              <>
                <ToastContainer />
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <Customers />
                </div>
              </>
            }
          />
          <Route
            path="/coupons"
            element={
              <>
                <ToastContainer />
                <Navbar />
                <hr />
                <div className="app-content">
                  <Sidebar />
                  <Coupons />
                </div>
              </>
            }
          />
        </Route>
      </Routes>

      {showAddMenu && <AddMenuPopUp setShowAddMenu={setShowAddMenu} />}
    </>
  );
};

export default App;
