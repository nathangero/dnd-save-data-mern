import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { calcPassivePerception, calcProficiencyBonus, calcScoreMod, getScoreName } from "../../../utils/shared-functions";

export default function CharacterInfo(props) {
  const character = new Character(props.character);

  return (
    <>
      <div className="stat-row">
        <p>Level</p>
        <p>{character.level}</p>
      </div>
      <div className="stat-row">
        <p>Armor Class</p>
        <p>{character.armor}</p>
      </div>
      <div className="stat-row">
        <p>Initiative</p>
        <p>{calcScoreMod(character.scores.dex)}</p>
      </div>
      <div className="stat-row">
        <p>Speed (ft.)</p>
        <p>{character.speed}</p>
      </div>
      <div className="stat-row">
        <p>Current HP</p>
        <p>{character.hp.current}/{character.hp.max}</p>
      </div>
      <div className="stat-row">
        <p>Temp HP</p>
        <p>{character.hp.temp}</p>
      </div>
      <div className="stat-row">
        <p>HP Die Type</p>
        <p>{character.hp.dieType}</p>
      </div>
      <div className="stat-row">
        <p>HP Die Count</p>
        <p>{character.hp.dieAmountCurrent}/{character.hp.dieAmountMax}</p>
      </div>
      <div className="stat-row">
        <p>Death Save Successes</p>
        <p>{character.deathSaves.successes}/3</p>
      </div>
      <div className="stat-row">
        <p>Death Save Failures</p>
        <p>{character.deathSaves.failures}</p>
      </div>
      <div className="stat-row">
        <p>Proficiency Bonus</p>
        <p>{calcProficiencyBonus(character.level)}</p>
      </div>
      <div className="stat-row">
        <p>Passive Perception</p>
        <p>{calcPassivePerception(character.scores.wis, character.skills.perception)}</p>
      </div>
      <div className="stat-row">
        <p>Spell Casting Stat</p>
        <p>{getScoreName(character.spellCastStat)}</p>
      </div>
      <div className="stat-row">
        <p>Inspiration</p>
        <p>{character.inspiration}</p>
      </div>
    </>
  )
}

CharacterInfo.propTypes = {
  character: PropTypes.object
}