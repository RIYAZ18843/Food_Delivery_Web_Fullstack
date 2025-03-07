import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully!", { position: "top-right" });
    navigate("/");
  };

  const handleOrdersClick = () => {
    toast.info("Redirecting to your orders...", { position: "top-right" });
    navigate("/myorders");
  };

  return (
    <div className="navbar">
      <ToastContainer /> {/* Toast container to show notifications */}

      <Link to="/">
        <span className="logo-text">Riyaz.</span>
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`${menu === "home" ? "active" : ""}`}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={`${menu === "menu" ? "active" : ""}`}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mob-app")}
          className={`${menu === "mob-app" ? "active" : ""}`}
        >
          mobile app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={`${menu === "contact" ? "active" : ""}`}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <Link to="/cart" className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </Link>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={handleOrdersClick}>
                <img src={assets.bag_icon} alt="" /> <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" /> <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
