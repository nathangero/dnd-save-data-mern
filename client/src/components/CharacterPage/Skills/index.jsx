import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { SKILL_KEYS, SKILL_NAMES, SKILL_NAME_SCORES } from "../../../utils/enums";
import { calcScoreWithProficiency } from "../../../utils/shared-functions";

export default function Skills(props) {
  const character = new Character(props.character);

  return (
    <>
      <ul className="list-unstyled">
        {Object.values(SKILL_KEYS).map((skill, index) => (
          <li key={index} className="mb-3 stat-row">
            <div className="d-flex">
              <div className="me-3">
                {character.skills[skill] ?
                  <i className="bi bi-p-square"></i> :
                  <i className="bi bi-app"></i>
                }
              </div>
              <p className="mb-0">{SKILL_NAMES[skill]} <i>({SKILL_NAME_SCORES[skill]})</i></p>
            </div>
            <b>{calcScoreWithProficiency(character.scores[SKILL_NAME_SCORES[skill]], character.level, character.skills[skill], true)}</b>
          </li>
        ))}
      </ul>
    </>
  )
}

Skills.propTypes = {
  character: PropTypes.object
}