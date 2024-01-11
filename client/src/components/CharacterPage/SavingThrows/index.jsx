import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { ABILITY_SCORE_KEYS, ABILITY_SCORE_NAMES } from "../../../utils/enums";
import { calcScoreWithProficiency } from "../../../utils/shared-functions";

export default function SavingThrows({ char, toggleSectionShowing, isShowingSavingThrows, toggleEditing, isEditing }) {
  const character = new Character(char);

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-saving-throws" aria-expanded="false" aria-controls="character-view-saving-throws">
          <h2 className="section-title">
            Saving Throws
          </h2>
          {isShowingSavingThrows ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <button className="btn btn-secondary button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>
      </div>

      <div id="character-view-saving-throws" className="collapse show">
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
                <p className="mb-0">{ABILITY_SCORE_NAMES[score]}</p>
              </div>
              <b>{calcScoreWithProficiency(character.scores[score], character.level, character.savingThrows[score], true)}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

SavingThrows.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingSavingThrows: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}