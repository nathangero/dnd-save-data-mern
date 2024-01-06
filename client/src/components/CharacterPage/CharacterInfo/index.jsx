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
        <b>{character.level}</b>
      </div>
      <div className="stat-row">
        <p>Armor Class</p>
        <b>{character.armor}</b>
      </div>
      <div className="stat-row">
        <p>Initiative</p>
        <b>{calcScoreMod(character.scores.dex)}</b>
      </div>
      <div className="stat-row">
        <p>Speed (ft.)</p>
        <b>{character.speed}</b>
      </div>
      <div className="stat-row">
        <p>Current HP</p>
        <b>{character.hp.current}/{character.hp.max}</b>
      </div>
      <div className="stat-row">
        <p>Temp HP</p>
        <b>{character.hp.temp}</b>
      </div>
      <div className="stat-row">
        <p>HP Die Type</p>
        <b>{character.hp.dieType}</b>
      </div>
      <div className="stat-row">
        <p>HP Die Count</p>
        <b>{character.hp.dieAmountCurrent}/{character.hp.dieAmountMax}</b>
      </div>
      <div className="stat-row">
        <p>Death Save Successes</p>
        <b>{character.deathSaves.successes}/3</b>
      </div>
      <div className="stat-row">
        <p>Death Save Failures</p>
        <b>{character.deathSaves.failures}/3</b>
      </div>
      <div className="stat-row">
        <p>Proficiency Bonus</p>
        <b>{calcProficiencyBonus(character.level)}</b>
      </div>
      <div className="stat-row">
        <p>Passive Perception</p>
        <b>{calcPassivePerception(character.scores.wis, character.skills.perception)}</b>
      </div>
      <div className="stat-row">
        <p>Spell Casting Stat</p>
        <b>{getScoreName(character.spellCastStat)}</b>
      </div>
      <div className="stat-row">
        <p>Inspiration</p>
        <b>{character.inspiration}</b>
      </div>
    </>
  )
}

CharacterInfo.propTypes = {
  character: PropTypes.object
}