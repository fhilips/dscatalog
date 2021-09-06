import {
  getAccessTokenDecoded, logout
} from "core/utils/auth";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import menu from "../../assets/images/menu.svg";
import "./styles.scss";


const Navbar = () => {
  const [drawerActive, setDrawerActive] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const location = useLocation();

  useEffect(() => {
    const currentUser = getAccessTokenDecoded();
    setCurrentUser(currentUser.user_name);
  }, [location]);
  const handleLogout = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    logout();
  };
  return (
    <nav className="bg-primary main-nav">
      <Link to="/" className="nav-logo-text">
        <h4>DS Catalog</h4>
      </Link>

      <button
        className="menu-mobile-btn"
        type="button"
        onClick={() => setDrawerActive(!drawerActive)}
      >
        <img src={menu} alt="Mobile Menu" />
      </button>

      <div
        className={drawerActive ? "menu-mobile-container" : "menu-container"}
      >
        <ul className="main-menu">
          <li>
            <NavLink to="/" exact className="nav-link" onClick={() => setDrawerActive(false)}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="nav-link" onClick={() => setDrawerActive(false)}>
              CATÁLOGO
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className="nav-link" onClick={() => setDrawerActive(false)}>
              ADMIN
            </NavLink>
          </li>
          {drawerActive && (
            <li>
              {currentUser && (
                <a href="#logout" 
                className="nav-link active d-inline" 
                onClick={(e) => {
                  setDrawerActive(false);
                  handleLogout(e);
                  }}>
                  {`LOGOUT - ${currentUser}`}
                </a>
              )}
            </li>
          )}
           {drawerActive && (
            <>
              {!currentUser && (
                <li>
                  <Link to="/auth/login" className="nav-link active" onClick={() => setDrawerActive(false)}>
                    LOGIN
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
      <div className="user-info-dnone text-right">
        {currentUser && (
          <>
            {currentUser}
            <a
              href="#logout"
              className="nav-link active d-inline"
              onClick={(e) => {
                setDrawerActive(false);
                handleLogout(e);
              }}
            >
              LOGOUT
            </a>
          </>
        )}
        {!currentUser && (
          <Link to="/auth/login" className="nav-link active" onClick={() => setDrawerActive(false)}>
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
