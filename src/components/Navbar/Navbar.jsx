import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiration");

      navigate("/login");
    }
  };
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <img
        onClick={handleLogout}
        className="profile"
        src={assets.profile_image}
        alt=""
      />
    </div>
  );
};

export default Navbar;
