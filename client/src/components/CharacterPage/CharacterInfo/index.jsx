import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { calcPassivePerception, calcProficiencyBonus, calcScoreMod, getScoreName } from "../../../utils/shared-functions";
import { useState } from "react";

export default function CharacterInfo({ char, toggleSectionShowing, isShowingInfo, toggleEditing, isEditing }) {
  const character = new Character(char);

  const [level, setLevel] = useState(character.level);
  const [armor, setArmor] = useState(character.armor);
  const [speed, setSpeed] = useState(character.speed);
  const [hp, setHp] = useState(character.hp);
  const [deathSaves, setDeathSaves] = useState(character.deathSaves);
  const [inspiration, setInspiration] = useState(character.inspiration);

  const onChangeLevel = ({ target }) => setLevel(target.value);
  const onChangeArmor = ({ target }) => setArmor(target.value);
  const onChangeSpeed = ({ target }) => setSpeed(target.value);
  const onChangeHpCurrent = ({ target }) => setHp({ ...hp, current: target.value });
  const onChangeHpMax = ({ target }) => setHp({ ...hp, max: target.value });
  const onChangeHpTemp = ({ target }) => setHp({ ...hp, temp: target.value });
  const onChangeHpDieAmountCurrent = ({ target }) => setHp({ ...hp, dieAmountCurrent: target.value });
  const onChangeHpDieAmountMax = ({ target }) => setHp({ ...hp, dieAmountMax: target.value });
  const onChangeDeathFailure = ({ target }) => setDeathSaves({ ...deathSaves, failures: target.value });
  const onChangeDeathSuccess = ({ target }) => setDeathSaves({ ...deathSaves, successes: target.value });
  const onChangeInspriation = ({ target }) => setInspiration(target.value);

  const renderEditing = () => {
    return (
      <>
        <div className="stat-row">
          <p>Level</p>
          <input className="edit-input" value={level} onChange={onChangeLevel} />
        </div>
        <div className="stat-row">
          <p>Armor Class</p>
          <input className="edit-input" value={armor} onChange={onChangeArmor} />
        </div>
        <div className="stat-row">
          <p>Initiative</p>
          <input className="edit-input" value={calcScoreMod(character.scores.dex, true)} disabled />
        </div>
        <div className="stat-row">
          <p>Speed (ft.)</p>
          <input className="edit-input" value={speed} onChange={onChangeSpeed} />
        </div>
        <div className="stat-row">
          <p>Current HP</p>
          <div>
            <input className="edit-input" value={hp.current} onChange={onChangeHpCurrent} />
            <label className="px-2">/</label>
            <input className="edit-input" value={hp.max} onChange={onChangeHpMax} />
          </div>
        </div>
        <div className="stat-row">
          <p>Temp HP</p>
          <input className="edit-input" value={hp.temp} onChange={onChangeHpTemp} />
        </div>
        <div className="stat-row">
          <p>HP Die Type</p>
          <input className="edit-input" value={character.hp.dieType} disabled />
        </div>
        <div className="stat-row">
          <p>HP Die Count</p>
          <div>
            <input className="edit-input" value={hp.dieAmountCurrent} onChange={onChangeHpDieAmountCurrent} />
            <label className="px-2">/</label>
            <input className="edit-input" value={hp.dieAmountMax} onChange={onChangeHpDieAmountMax} />
          </div>
        </div>
        <div className="stat-row">
          <p>Death Save Successes</p>
          <div>
            <select onChange={onChangeDeathSuccess} value={deathSaves.successes}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            <b>/3</b>
          </div>
        </div>
        <div className="stat-row">
          <p>Death Save Failures</p>
          <div>
            <select onChange={onChangeDeathFailure} value={deathSaves.failures}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            <b>/3</b>
          </div>
        </div>
        <div className="stat-row">
          <p>Proficiency Bonus</p>
          <input className="edit-input" value={calcProficiencyBonus(character.level, true)} disabled />
        </div>
        <div className="stat-row">
          <p>Passive Perception</p>
          <input className="edit-input" value={calcPassivePerception(character.scores.wis, character.level, character.skills.perception, true)} disabled />
        </div>
        <div className="stat-row">
          <p>Spell Casting Stat</p>
          <b className="pt-2">{getScoreName(character.spellCastStat, true)}</b>
        </div>
        <div className="stat-row">
          <p>Inspiration</p>
          <input className="edit-input" value={inspiration} onChange={onChangeInspriation} />
        </div>
      </>
    )
  }

  const renderViewing = () => {
    return (
      <>
        <div className="stat-row">
          <p>Level</p>
          <b>{level}</b>
        </div>
        <div className="stat-row">
          <p>Armor Class</p>
          <b>{armor}</b>
        </div>
        <div className="stat-row">
          <p>Initiative</p>
          <b>{calcScoreMod(character.scores.dex, true)}</b>
        </div>
        <div className="stat-row">
          <p>Speed (ft.)</p>
          <b>{speed}</b>
        </div>
        <div className="stat-row">
          <p>Current HP</p>
          <b>{hp.current}/{hp.max}</b>
        </div>
        <div className="stat-row">
          <p>Temp HP</p>
          <b>{hp.temp}</b>
        </div>
        <div className="stat-row">
          <p>HP Die Type</p>
          <b>{character.hp.dieType}</b>
        </div>
        <div className="stat-row">
          <p>HP Die Count</p>
          <b>{hp.dieAmountCurrent}/{hp.dieAmountMax}</b>
        </div>
        <div className="stat-row">
          <p>Death Save Successes</p>
          <b>{deathSaves.successes}/3</b>
        </div>
        <div className="stat-row">
          <p>Death Save Failures</p>
          <b>{deathSaves.failures}/3</b>
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
          <b>{inspiration}</b>
        </div>
      </>
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

        <button className="btn btn-secondary button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>
      </div>

      <div id="character-view-info" className="collapse show">
        {isEditing ?
          renderEditing() :
          renderViewing()
        }
      </div>
    </div>
  )
}

CharacterInfo.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingInfo: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}