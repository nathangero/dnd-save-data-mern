import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { ABILITY_SCORE_KEYS, ABILITY_SCORE_NAMES } from "../../../utils/enums";
import { calcScoreMod } from "../../../utils/shared-functions";

export default function SavingThrows(props) {
  const character = new Character(props.character);

  return (
    <>
      <ul className="list-unstyled">
        {Object.values(ABILITY_SCORE_KEYS).map((score, index) => (
          <li key={index} className="mb-3 stat-row">
            <div className="d-flex">
              <div className="me-3">
                {character.savingThrows[score] ?
                  <i className="bi bi-p-square"></i> :
                  <i className="bi bi-app"></i>
                }
              </div>
              <p className="mb-0">{ABILITY_SCORE_NAMES[score.toUpperCase()]}</p>
            </div>
            <b>{calcScoreMod(character.scores[score])}</b>
          </li>
        ))}
      </ul>
    </>
  )
}

SavingThrows.propTypes = {
  character: PropTypes.object
}