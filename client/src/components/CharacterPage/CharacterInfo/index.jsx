import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { calcPassivePerception, calcProficiencyBonus, calcScoreMod, getScoreName } from "../../../utils/shared-functions";

export default function CharacterInfo({ char, toggleSectionShowing, isShowingInfo, isEditing }) {
  const character = new Character(char);

  const renderEditing = () => {
    return (
      <div>
        will edit
      </div>
    )
  }

  const renderViewing = () => {
    return (
      <div id="character-view-info" className="collapse show">
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
          <b>{calcScoreMod(character.scores.dex, true)}</b>
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
          <b>{calcProficiencyBonus(character.level, true)}</b>
        </div>
        <div className="stat-row">
          <p>Passive Perception</p>
          <b>{calcPassivePerception(character.scores.wis, character.level, character.skills.perception, true)}</b>
        </div>
        <div className="stat-row">
          <p>Spell Casting Stat</p>
          <b>{getScoreName(character.spellCastStat, true)}</b>
        </div>
        <div className="stat-row">
          <p>Inspiration</p>
          <b>{character.inspiration}</b>
        </div>
      </div>
    )
  }

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-info" aria-expanded="false" aria-controls="character-view-info">
          <h2 className="section-title">
            Character Info
          </h2>
          {isShowingInfo ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <button className="btn btn-secondary button-edit">Edit</button>
      </div>

      {isEditing ?
        renderEditing() :
        renderViewing()
      }
    </div>
  )
}

CharacterInfo.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingInfo: PropTypes.bool,
  isEditing: PropTypes.bool,
}