import { Link, useLocation } from "react-router-dom";
import "./style.css"

export default function Nav() {

  const onClickLogout = async (e) => {
    e.preventDefault();
    console.log("@onClickLogout")
  }

  return (
    <>
      <header className="">


        <nav className="nav nav-tabs justify-content-start">
          <div className="mx-2 mt-1">
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#side-menu" aria-controls="side-menu">
              <i className="bi bi-list fs-1"></i>
            </button>

            <div id="side-menu" className="offcanvas offcanvas-start" tabIndex="-1" aria-labelledby="side-menu-label">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="side-menu-label">USER NAME</h5>
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
                  useLocation().pathname === "/campaigns" ?
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
                  useLocation().pathname === "/characters" ?
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
                  useLocation().pathname === "/sessions" ?
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


