import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import './Styles.css';

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      // <> react fragment
      <>
        <Link to="/">
          <li className="nav-item nav-link" id="navLink">Home</li>
        </Link>
        <Link to="/login">
          <li className="nav-item nav-link" id="navLink">Login</li>
        </Link>
        <Link to="/register">
          <li className="nav-item nav-link" id="navLink">Register</li>
        </Link>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link" id="navLink">Home</li>
        </Link>
        <Link to="/todos">
          <li className="nav-item nav-link" id="navLink">Todos</li>
        </Link>
        {user.role === "admin" ? (
          <Link to="/admin">
            <li className="nav-item nav-link" id="navLink">Admin</li>
          </Link>
        ) : null}
        <button
          type="button"
          className="btn btn-link nav-item nav-link"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <header>
      <div>
        <nav className="navbar navbar-expand-md">

          <Link to="/">
            <div className="navbar-brand">CoderYoda's Web App</div>
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav3" aria-controls="navbarNav3" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav3">
            <ul className="navbar-nav ml-auto">

              {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}

            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};


export default Navbar;
