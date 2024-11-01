import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/isLogged/isLogged";
import { useEffect } from "react";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";
export default function Navbar() {
  const islogged = useSelector((state) => state.isLogged.value);
  const userData = useSelector((state) => state.isLogged.loginData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    async function getCookie() {
      const cookie = await axios.get(import.meta.env.VITE_API_URL+"/getcookie", {
        withCredentials: true,
      });
      if (cookie.data == "") {
        dispatch(logout());
        navigate("/");
      }
    }
    getCookie();
  }, []);
  async function logoutUser() {
    try {
      let result = await axios.get(import.meta.env.VITE_API_KEY+
        
        "/logout", {
        withCredentials: true,
      });
      if (result.data.expired) navigate("/login");
      if (result.data.error) toast.error(result.data.error);
      if (result.data.success) toast.success(result.data.success);
      dispatch(logout());
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary sticky-top">
        {console.log(islogged)}
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            YourStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {!islogged && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" style={{marginTop:".5rem"}}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup" style={{marginTop:".5rem"}}>
                      Signup
                    </Link>
                  </li>
                </>
              )}
              {islogged && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <img
                        className="navimg"
                        src={userData.image}
                        alt="Profile"
                      />
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={logoutUser}
                    style={{ marginTop: "8px" }}
                  >
                    <Link className="nav-link">Logout</Link>
                  </li>
                </>
              )}
            <SearchBar/>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
