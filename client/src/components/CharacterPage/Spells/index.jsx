import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { useEffect, useState } from "react";
import { makeIdFromName, makeJumpToForSection, scrollToListItem } from "../../../utils/shared-functions";
import { SPELL_NAMES } from "../../../utils/enums";

export default function Spells(props) {
  const character = new Character(props.character);

  const [jumpToMenu, setMenu] = useState({});

  useEffect(() => {
    // Make jump to menu
    setMenu(makeJumpToForSpell());
  }, [])

  /**
   * Creates a div id from the spell name
   * @param {String} name Feature/Trait name
   * @returns A string of the name lowercased and spaces replacecd with dashes 
   */
  const makeIdFromSpellLevel = (name) => {
    const id = `spell-${name.toLowerCase().split("_").join("-")}`;
    return id;
  }

  /**
   * Takes an array and sets all the `.name` attributes as the key, and converts the key to an id using the `makeIdFromName()` function.
   * So if the `.name` is "Action Surge", its id will be "action-surge".
   * @param {Array} list 
   * @returns An object where the keys are the list item name, and its value is the id created for the item
   */
  const makeJumpToForSpell = () => {
    const jumpToMenu = {};

    Object.keys(character.spells)?.map(spellLevel => {
      if (!SPELL_NAMES[spellLevel]) return; // Ignore _typename and _id
      if (!character.spells[spellLevel].length > 0) return; // Ignore any spell level that doesn't have spells
      const id = makeIdFromSpellLevel(spellLevel);
      jumpToMenu[SPELL_NAMES[spellLevel]] = id; // Add the new name with its div id
    })

    return jumpToMenu
  }

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => props.toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-spells" aria-expanded="false" aria-controls="character-view-spells">
          <h2 className="section-title spells">
            Spells
          </h2>
          {props.isShowingSpells ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="dropdown">
          <div className={props.isShowingSpells ? "d-flex align-items-baseline" : "d-flex flex-row-reverse align-items-baseline"}>
            <button
              className={props.isShowingSpells ? "btn dropdown-toggle button-menu-jump me-3" : "btn dropdown-toggle button-menu-jump me-3 hide-dropdown"}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Jump to
            </button>
            <button className="btn button-edit">Edit</button>

            <ul className="dropdown-menu">
              {Object.keys(jumpToMenu).map((key, index) => (
                <li key={index} className="btn dropdown-item" onClick={() => scrollToListItem(jumpToMenu[key], document, window)}>{key}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id="character-view-spells" className="collapse show">
        {Object.keys(character.spells)?.map((spellLevel, index) => (
          <>
            {!SPELL_NAMES[spellLevel] ? null : // Ignore _typename and _id
              <div key={index} id={makeIdFromSpellLevel(spellLevel)} className="">
                {!character.spells[spellLevel].length > 0 ? null : // Only show spell levels that have spells
                  <> {/* Show the spell info */}
                    <div className="sticky-top spell-level">
                      <h3><b><u>{SPELL_NAMES[spellLevel]}</u></b></h3>
                    </div>
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