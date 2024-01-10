import { Character } from "../../models/Character";

import "./style.css";
import { Link } from "react-router-dom";
import ROUTES from "../../utils/routes";

export default function CharacterCreate() {


  return (
    <div className="character-page">
      <Link
        to={ROUTES.CHARACTERS}
        className="btn btn-secondary rounded-0"
      >
        Back to Characters
      </Link>

      <div id="character-create-background">
      </div>

      <div id="character-create-base">

      </div>

      <div id="character-create-base">

      </div>

      <div id="character-create-base">

      </div>

      <div id="character-create-base">

      </div>

      <div id="character-create-base">

      </div>

      <div id="character-create-base">

      </div>

      <div id="character-create-base">

      </div>

    </div>
  )
}