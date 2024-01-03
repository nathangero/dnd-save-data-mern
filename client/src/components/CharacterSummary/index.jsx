import PropTypes from "prop-types";
import { Character } from "../../models/Character";

import "./style.css";

export default function CharacterSummary(props) {
  const character = Character.prototype.fromSnapshot(props.character);
  console.log(character.scores)

  return (
    <div className="p-2 summary">
      <div className="d-flex flex-row justify-content-between">
        <h2>{character.name}</h2>
        <p className="fs-4 m-0">Level: {character.level}</p>
      </div>

      <p className="fs-4 m-0">{character.class}</p>
      <p className="fs-4 m-0">{character.alignment}</p>
      
      <div className="d-flex flex-row justify-content-between">
      <p className="fs-4 m-0">HP:</p>
      <p className="fs-4 m-0">current/max</p>
      </div>

    </div>
  )
}

CharacterSummary.propTypes = {
  character: PropTypes.object
}