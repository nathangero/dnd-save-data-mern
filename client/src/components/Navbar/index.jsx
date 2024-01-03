import { Link, useLocation } from "react-router-dom";
import "./style.css"
import { auth } from "../../../../firebase/firebase.js";
import ROUTES from "../../utils/routes"
import { useDispatch, useSelector } from "react-redux";
import { USER_ACTIONS } from "../../redux/reducer";

export default function Nav() {

  const { username } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onClickLogout = async (e) => {
    e.preventDefault();

    window.location.href = ROUTES.LOGIN; // Move use back to home page to allow signing in again
    auth.signOut(); // Remove Firebase user credentials

    // Delay dispatch for a smoother screen transition
    setTimeout(() => {
      dispatch({ type: USER_ACTIONS.LOGOUT }); // Make user state null
    }, 500)
  }

  return (
    <>
      <header>
        <nav className="nav nav-tabs justify-content-between">
          <div className="mx-2 mt-1">
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#side-menu" aria-controls="side-menu">
              <i className="bi bi-list fs-1"></i>
            </button>

            <div id="side-menu" className="offcanvas offcanvas-start" tabIndex="-1" aria-labelledby="side-menu-label">
              <div className="offcanvas-header">
                <h1 className="offcanvas-title" id="side-menu-label">{username}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <ul className="list-unstyled fs-3">
                  <li>
                    <a onClick={onClickLogout} role="button">Logout</a>
                  </li>

                  <li className="fixed-bottom m-3">
                    Version: 0.0
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <ul className="list-unstyled list-group list-group-horizontal fs-5 px-0 mx-0">
            <li className="">
              <Link
                to="/campaigns"
                className={
                  useLocation().pathname === ROUTES.CAMPAIGNS ?
                    "nav-link active" :
                    "nav-link"
                }
              >
                Campaigns
              </Link>
            </li>

            <li className="">
              <Link
                to="/characters"
                className={
                  useLocation().pathname.includes(ROUTES.CHARACTERS) ?
                    "nav-link active" :
                    "nav-link"
                }
              >
                Characters
              </Link>
            </li>

            <li className="">
              <Link
                to="/sessions"
                className={
                  useLocation().pathname === ROUTES.SESSIONS ?
                    "nav-link active" :
                    "nav-link"
                }
              >
                Sessions
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}


