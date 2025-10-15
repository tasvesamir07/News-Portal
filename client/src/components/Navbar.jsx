import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/bn";
import "./Navbar.css";

dayjs.locale("bn");

const Navbar = () => {
  const [time, setTime] = useState(dayjs().format("h:mm:ss A"));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs().format("h:mm:ss A"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="navbar-header">
      <div className="nav-container">
        <Link to="/category/সর্বশেষ" className="nav-logo">
          নিউজ পোর্টাল
        </Link>
        <nav className="nav-links">
          {/* These are the new categories you requested */}
          <NavLink to="/category/বাংলাদেশ">বাংলাদেশ</NavLink>
          <NavLink to="/category/বাণিজ্য">বাণিজ্য</NavLink>
          <NavLink to="/category/খেলা">খেলা</NavLink>
          <NavLink to="/category/বিশ্ব">বিশ্ব</NavLink>
          <NavLink to="/category/মতামত">মতামত</NavLink>
        </nav>
        <div className="nav-time">{time}</div>
      </div>
    </header>
  );
};

export default Navbar;
