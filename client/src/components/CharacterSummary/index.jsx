import PropTypes from "prop-types";

import "./style.css";
import { Link } from "react-router-dom";
import ROUTES from "../../utils/routes";

export default function CharacterSummary({ character }) {

  return (
    <div className="p-2 summary">
      <Link
        to={`${ROUTES.CHARACTERS}/${character._id}`}
        className="link-to-page"
      >

        <div className="d-flex flex-row justify-content-between">
          <h2>{character.name}</h2>
          <h3 className="fs-4 m-0">Level: {character.level}</h3>
        </div>

        <p className="fs-4 m-0">{character.class}</p>
        <p className="fs-4 m-0">{character.race}</p>

        <div className="d-flex flex-row justify-content-start">
          <p className="fs-4 m-0">HP: {character.hp.current}/{character.hp.max}</p>
        </div>

      </Link>
    </div>

  )
}

CharacterSummary.propTypes = {
  character: PropTypes.object,
}