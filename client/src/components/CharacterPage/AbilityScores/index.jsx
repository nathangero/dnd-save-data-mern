import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { calcScoreMod } from "../../../utils/shared-functions";
import { ABILITY_SCORE_KEYS, ABILITY_SCORE_NAMES } from "../../../utils/enums";

export default function AbilityScores(props) {
  const character = new Character(props.character);

  return (
    <>
      {Object.values(ABILITY_SCORE_KEYS).map((score, index) => (
        <div key={index} className="stat-row">
          <p>{ABILITY_SCORE_NAMES[score.toUpperCase()]} <i>({character.scores[score]})</i></p>
          <b>{calcScoreMod(character.scores[score])}</b>
        </div>
      ))}
    </>
  )
}

AbilityScores.propTypes = {
  character: PropTypes.object
}