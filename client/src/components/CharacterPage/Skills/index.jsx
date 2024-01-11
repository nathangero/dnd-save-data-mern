import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { SKILL_KEYS, SKILL_NAMES, SKILL_NAME_SCORES } from "../../../utils/enums";
import { calcScoreWithProficiency } from "../../../utils/shared-functions";

export default function Skills({ char, toggleSectionShowing, isShowingSkills, toggleEditing, isEditing }) {
  const character = new Character(char);

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-skills" aria-expanded="false" aria-controls="character-view-skills">
          <h2 className="section-title">
            Skills
          </h2>
          {isShowingSkills ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <button className="btn btn-secondary button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>
      </div>
      
      <div id="character-view-skills" className="collapse show">
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
      </div>
    </div>
  )
}

Skills.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingSkills: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}