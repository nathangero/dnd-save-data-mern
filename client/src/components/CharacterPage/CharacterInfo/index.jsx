import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";

export default function CharacterInfo(props) {
  const character = new Character(props.character);

  return (
    <>
      <div className="d-flex">
        <h2 className="section-title" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-info" aria-expanded="false" aria-controls="character-view-info">
          Character Info
        </h2>
        <button className="btn btn-secondary button-edit">Edit</button>
      </div>

      <section id="character-view-info" className="collapse show fs-3 m-auto">
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
          <p>{character.scores.dex}</p>
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
          <p>{character.level}</p>
        </div>
        <div className="stat-row">
          <p>Passive Perception</p>
          <p>{character.level}</p>
        </div>
        <div className="stat-row">
          <p>Spell Casting Stat</p>
          <p>{character.spellCastStat}</p>
        </div>
        <div className="stat-row">
          <p>Inspiration</p>
          <p>{character.inspiration}</p>
        </div>
      </section>
    </>
  )
}

CharacterInfo.propTypes = {
  character: PropTypes.object
}