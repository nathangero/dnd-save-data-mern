import { ABILITY_SCORE_KEYS, ABILITY_SCORE_NAMES } from "../../utils/enums";
import "./style.css";

export default function CharacterSheet() {

  return (
    <section className="character-sheet m-3 p-3">
      <h2>Dungeons & Dragons 5E Character Sheet</h2>

      <div className="sheet-header row-sm">
        <div className="character-info col-sm-3">
          <div>
            <label>Character Name</label>
            <br />
            <input />
          </div>
          <div>
            <label>Player Name</label>
            <br />
            <input />
          </div>
        </div>

        <div className="character-background col-sm-8">
          <div>
            <label>Class</label>
            <br />
            <input />
          </div>
          <div>
            <label>Level</label>
            <br />
            <input />
          </div>
          <div>
            <label>Background</label>
            <br />
            <input />
          </div>
          <div>
            <label>Race</label>
            <br />
            <input />
          </div>
          <div>
            <label>Alignment</label>
            <br />
            <input />
          </div>
          <div>
            <label>Experience Points</label>
            <br />
            <input />
          </div>
        </div>
      </div>

      <br />

      <div className="sheet-body row-lg">
        <div className="d-flex flex-row col-lg-4">
          <div className="character-scores col-lg pe-2">
            <div className="score-container">
              <h5>{ABILITY_SCORE_NAMES[ABILITY_SCORE_KEYS.STR]}</h5>
              <h6>score mod</h6>
              <input type="number" className="edit-input fs-5" />
            </div>
            <div className="score-container">
              <h5>{ABILITY_SCORE_NAMES[ABILITY_SCORE_KEYS.DEX]}</h5>
              <h6>score mod</h6>
              <input type="number" className="edit-input fs-5" />
            </div>
            <div className="score-container">
              <h5>{ABILITY_SCORE_NAMES[ABILITY_SCORE_KEYS.CON]}</h5>
              <h6>score mod</h6>
              <input type="number" className="edit-input fs-5" />
            </div>
            <div className="score-container">
              <h5>{ABILITY_SCORE_NAMES[ABILITY_SCORE_KEYS.INT]}</h5>
              <h6>score mod</h6>
              <input type="number" className="edit-input fs-5" />
            </div>
            <div className="score-container">
              <h5>{ABILITY_SCORE_NAMES[ABILITY_SCORE_KEYS.WIS]}</h5>
              <h6>score mod</h6>
              <input type="number" className="edit-input fs-5" />
            </div>
            <div className="score-container">
              <h5>{ABILITY_SCORE_NAMES[ABILITY_SCORE_KEYS.CHA]}</h5>
              <h6>score mod</h6>
              <input type="number" className="edit-input fs-5" />
            </div>
          </div>
          <div className="character-skills col-lg-7 border">
            skills
          </div>
        </div>
        <div className="character-scores col-lg-4 border">
          armor
        </div>
        <div className="character-scores col-lg-4 border">
          feats
        </div>
      </div>
    </section>
  )
}