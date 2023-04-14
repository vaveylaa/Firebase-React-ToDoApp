import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGithub } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import navbar from "./navbar.css";

const NavBar = ({ handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark shadow-5-strong"style={{ height: "80px" ,marginLeft:"10px" }}>
      <div className="container-fluid">

        <a className="navbar-brand" href="#" style={{fontSize: "40px", fontWeight: "bold"}}>
        TODO !
        </a>     

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"style={{marginLeft:"30px"}}>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="https://github.com/vaveylaa/Firebase-React-ToDoApp" target="_blank" style={{fontSize: "20px", fontWeight: "bold"}}>
                Detail
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active " href="https://github.com/vaveylaa" target="_blank" style={{fontSize: "20px", fontWeight: "bold"}}>
                Github Link
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <a href="/">
              <button
                type="button"
                className="logout btn  me-3"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
