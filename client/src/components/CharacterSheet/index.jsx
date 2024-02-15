import "./style.css";
import { ABILITY_SCORE_KEYS, ABILITY_SCORE_NAMES, SKILL_KEYS, SKILL_NAMES, SKILL_NAME_SCORES } from "../../utils/enums";
import { capitalizeFirst } from "../../utils/shared-functions.js"

export default function CharacterSheet() {

  return (
    <section className="character-sheet m-3 p-2">
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
        <div className="column-one col-lg-5 pe-2">
          <div className="d-flex flex-row">
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

            <div className="d-flex flex-column col-lg-8">
              <div className="d-flex justify-content-between align-items-baseline">
                <h5>Inspiration</h5>
                <input type="number" className="edit-input fs-5" />
              </div>

              <br />

              <div className="d-flex justify-content-between align-items-baseline">
                <h5>Proficiency Bonus</h5>
                <h6>level mod</h6>
              </div>

              <br />

              <div className="character-saving-throws">
                <h5 className="text-center">Saving Throws</h5>
                {Object.values(ABILITY_SCORE_KEYS).map((value, index) => (
                  <div key={index} className="container-saving-throws">
                    <h6>{ABILITY_SCORE_NAMES[value]}</h6>
                    <div className="d-flex align-items-center">
                      <h6 className="me-2">mod</h6>
                      <i className="bi bi-p-square fs-3"></i>
                    </div>
                  </div>
                ))}
              </div>

              <div className="character-skills">
                <h5 className="text-center">Skills</h5>
                {Object.values(SKILL_KEYS).map((value, index) => (
                  <div key={index} className="container-skills">
                    <h6>{capitalizeFirst(SKILL_NAMES[value])} ({SKILL_NAME_SCORES[value]})</h6>
                    <div className="d-flex align-items-center">
                      <h6 className="me-2">mod</h6>
                      <i className="bi bi-p-square fs-3 me-2"></i>
                      <i className="bi bi-p-square fs-3"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <br />

          <div className="d-flex justify-content-between align-items-center">
            <h5>Passive Perception</h5>
            <h6>wis mod</h6>
          </div>

          <br />

          <div>
            <div className="character-proficiencies">
              <h5 className="text-center">Proficiences</h5>
            </div>
            <div className="character-languages">
              <h5 className="text-center">Languages</h5>
            </div>
          </div>
        </div>
        <div className="column-two col-lg-3 border">
          armor
        </div>
        <div className="column-three col-lg-4 border">
          feats
        </div>
      </div>
    </section>
  )
}