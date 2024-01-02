import { Link } from "react-router-dom";

import ROUTES from "../utils/routes.js";


export default function Home() {

  return (
    <>
      <div className="text-center">
        <h1 className="text-center">Welcome to D&D Save Data!</h1>
        <img src="/icons8-dungeons-and-dragons-480 copy.svg" width={200} className="img-fluid" alt="D&D image provided by icons8" />
        <p>Create your D&D character using the 5e character sheet, and freely update it at anytime!</p>
        <br />
        <p><Link to={ROUTES.LOGIN}>Click here</Link> to Login/Sign Up</p>
      </div>
    </>
  )
}