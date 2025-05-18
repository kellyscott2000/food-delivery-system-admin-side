import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => (
  <div>
    <ToastContainer />
    <Navbar />
    <hr />
    <div className="app-content" style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
