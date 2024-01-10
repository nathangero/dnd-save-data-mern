import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { calcScoreMod } from "../../../utils/shared-functions";
import { ABILITY_SCORE_KEYS, ABILITY_SCORE_NAMES } from "../../../utils/enums";

export default function AbilityScores(props) {
  const character = new Character(props.character);

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => props.toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-scores" aria-expanded="false" aria-controls="character-view-scores">
          <h2 className="section-title">
            Ability Scores
          </h2>
          {props.isShowingScores ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <button className="btn btn-secondary button-edit">Edit</button>
      </div>

      <div id="character-view-scores" className="collapse show">
        {Object.values(ABILITY_SCORE_KEYS).map((score, index) => (
          <div key={index} className="stat-row">
            <p>{ABILITY_SCORE_NAMES[score]} <i>({character.scores[score]})</i></p>
            <b>{calcScoreMod(character.scores[score], true)}</b>
          </div>
        ))}
      </div>
    </div>
  )
}

AbilityScores.propTypes = {
  character: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingScores: PropTypes.bool,
}