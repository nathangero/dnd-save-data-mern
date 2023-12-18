import { Link } from "react-router-dom";

export default function Nav() {

  return (
    <>
      <header>
        <nav className="">
          <Link
            to="/campaigns"
          >
            Campaigns
          </Link>

          <Link
            to="/characters"
          >
            Characters
          </Link>
          
          <Link
            to="/sessions"
          >
            Sessions
          </Link>
        </nav>
      </header>
    </>
  )
}