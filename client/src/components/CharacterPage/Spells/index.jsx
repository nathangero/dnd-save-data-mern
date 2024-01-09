import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { SPELL_NAMES } from "../../../utils/enums";

export default function Spells(props) {
  const character = new Character(props.character);
  console.log("character.spells:", character.spells);

  /**
   * Creates a div id from the spell name
   * @param {String} name Feature/Trait name
   * @returns A string of the name lowercased and spaces replacecd with dashes 
   */
  const makeIdFromSpellLevel = (name) => {
    const id = `spell-${name.toLowerCase().split("_").join("-")}`;
    return id;
  }

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => props.toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-spells" aria-expanded="false" aria-controls="character-view-spells">
          <h2 className="section-title">
            Spells
          </h2>
          {props.isShowingSpells ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <button className="btn btn-secondary button-edit">Edit</button>
      </div>

      <div id="character-view-spells" className="collapse show">
        {Object.keys(character.spells)?.map((spellLevel, index) => (
          <>
            {!SPELL_NAMES[spellLevel] ? null : // Ignore _typename and _id
              <div key={index} id={makeIdFromSpellLevel(spellLevel)} className="">
                {!character.spells[spellLevel].length > 0 ? null : // Only show spell levels that have spells
                  <> {/* Show the spell info */}
                    <b><u>{SPELL_NAMES[spellLevel]}</u></b>
                    {character.spells[spellLevel]?.map((spell, spellIndex) => (
                      <div key={spellIndex}>
                        <p className="text-start"><b>{spell.name}</b></p>
                        <div className="stat-row">
                          <p>Cast Time</p>
                          <b>{spell.castingTime} actions(s)</b>
                        </div>
                        <div className="stat-row">
                          <p>Duration</p>
                          <b>{spell.duration} {spell.durationType}</b>
                        </div>
                        <div className="stat-row">
                          <p>Range</p>
                          <b>{spell.range} ft</b>
                        </div>
                        <p className="description">{spell.description}</p>
                      </div>
                    ))
                    }
                  </>
                }
              </div>
            }
          </>
        ))}
      </div>
    </div>
  )
}

Spells.propTypes = {
  character: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingSpells: PropTypes.bool,
}