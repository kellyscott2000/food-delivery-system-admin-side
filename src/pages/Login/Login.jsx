import { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import config from "../../config/config";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.apiUrl}/api/admin/login`, {username, password} )
      if (response.status === 200) {
        const { token } = response.data;
        const expirationTime = new Date().getTime() + 60 * 60 * 1000;
        // localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('authToken', token);
        localStorage.setItem('tokenExpiration', expirationTime);
        
        navigate("/")
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.messgae || "Login failed")
    }
  }




  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleLogin}>
        <div className="login-popup-title">
          <h2>Admin Login</h2>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="login-popup-inputs">
          <input
            name="username"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div className="password-input-container">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={showPassword ? assets.eye_open : assets.eye_closed}
              alt="Toggle Password Visibility"
              className="toggle-password-visibility"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
