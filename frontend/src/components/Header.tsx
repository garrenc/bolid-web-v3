import React from "react";
import bolidLogo from "../assets/images/bolid-logo.jpg";
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src={bolidLogo} alt="БОЛИД" className="logo-image" />
          </Link>

          {/* Social Links */}
          <SocialLinks />
        </div>
      </div>
    </header>
  );
};

export default Header;
