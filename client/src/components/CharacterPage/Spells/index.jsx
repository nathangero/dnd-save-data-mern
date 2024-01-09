import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { useEffect, useState } from "react";
import { makeIdFromName, scrollToListItem } from "../../../utils/shared-functions";
import { SPELL_KEYS, SPELL_NAMES } from "../../../utils/enums";

export default function Spells(props) {
  const character = new Character(props.character);
  const OFFSET_SPELL_NAME = 160;

  const [jumpToMenu, setMenu] = useState({});
  const [jumpToSpell, setJumpSpell] = useState({});

  useEffect(() => {
    // Make jump to menu
    setMenu(makeJumpToForSpellLevel());
    setJumpSpell(makeJumpToSpells());
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
  const makeJumpToForSpellLevel = () => {
    const jumpToMenu = {};

    Object.keys(character.spells)?.map(spellLevel => {
      if (!SPELL_NAMES[spellLevel]) return; // Ignore _typename and _id
      if (!character.spells[spellLevel].length > 0) return; // Ignore any spell level that doesn't have spells
      const id = makeIdFromSpellLevel(spellLevel);
      jumpToMenu[SPELL_NAMES[spellLevel]] = id; // Add the new name with its div id
    });

    return jumpToMenu;
  }

  /**
   * Takes a spell's level and name and creates an id for it.
   * E.G. If the spell level is 1 and the spell name is "Magic Missle", the
   * result will be "spell-1-magic-missle".
   * 
   * We add the spell level because spells like Magic Missle have different levels, and we want to allow the user to jump to that spell name with the appropriate level.
   * @param {String} level 
   * @param {String} name 
   * @returns A string the contains that spell's level and name.
   */
  const makeIdFromSpell = (level, name) => {
    const id = `${makeIdFromSpellLevel(level)}-${makeIdFromName(name)}`;
    return id;
  }

  /**
   * Goes through all the spell levels and calls the helper function `makeSpellObject` to add any spells for a specific spell level to the spell menu.
   * 
   * This specifically calls all 10 spell levels instead of using a loop to avoid having nested loops. Since `makeSpellObject` uses a loop,
   * naming each spell level specifically prevents a nested loop.
   * 
   * @param {String} spellLevel 
   * @returns An object containing the spell level and the names of the spells in the corresponding level for the dropdown menu.
   */
  const makeJumpToSpells = () => {
    const fullSpellMenu = {};

    makeSpellObject(SPELL_KEYS.CANTRIPS, fullSpellMenu);
    makeSpellObject(SPELL_KEYS.LEVEL_1, fullSpellMenu);
    makeSpellObject(SPELL_KEYS.LEVEL_2, fullSpellMenu);
    makeSpellObject(SPELL_KEYS.LEVEL_3, fullSpellMenu);
    makeSpellObject(SPELL_KEYS.LEVEL_4, fullSpellMenu);
    makeSpellObject(SPELL_KEYS.LEVEL_5, fullSpellMenu);
    makeSpellObject(SPELL_KEYS.LEVEL_6, fullSpellMenu);
    makeSpellObject(SPELL_KEYS.LEVEL_7, fullSpellMenu);
    makeSpellObject(SPELL_KEYS.LEVEL_8, fullSpellMenu);
    makeSpellObject(SPELL_KEYS.LEVEL_9, fullSpellMenu);

    return fullSpellMenu;
  }

  /**
   * This loops through the character's spells inside of a spell level, takes the name and converts it to an HTML element id, and then updates the `menu` object.
   * 
   * First it checks if there are any spells associated with that spell level.
   * If nothing, then end the function and don't update the menu.
   * If something, then iterate through it and make a new object where the key is the spell name and the value is the new id.
   * Then update the `menu` with the new object.
   * 
   * Example of how the new object will look
   * If spell level Cantrips has 2 Cantrips called "Eldritch Blast" and "Fire Bolt", the object returning will look like:
   *   Cantrips: {
   *    "Eldritch Blast": spell-cantrip-eldritch-blast,
   *    "Fire Bolt": spell-cantrip-fire-bolt
   *   }
   * @param {String} spellLevel 
   * @param {Object} menu Object that's updated inside the function
   * @returns 
   */
  const makeSpellObject = (spellLevel, menu) => {
    if (character.spells[spellLevel].length === 0) return; // Ignore any spell level that doesn't have spells

    const spells = {};

    character.spells[spellLevel]?.map(spell => {
      const id = makeIdFromSpell(spellLevel, spell.name);
      spells[spell.name] = id; // Add the new name with its div id
    });

    menu[spellLevel] = spells; // Update the menu's spell level with the object of spells
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
          <div className="d-flex align-items-baseline">
            <button className="btn button-edit">Edit</button>

            <button
              className={props.isShowingSpells ? "btn dropdown-toggle button-menu-jump ms-3" : "btn dropdown-toggle button-menu-jump ms-3 hide-dropdown"}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Jump to level
            </button>

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
            {!SPELL_NAMES[spellLevel] ? null : // Ignore _typename and _id\
              <>
                {!character.spells[spellLevel]?.length > 0 ? null : // Only show spell levels that have spells
                  <div key={index} id={makeIdFromSpellLevel(spellLevel)} className="">
                    <div className="spell-info">
                      <div className="character-view-header sticky-top align-items-baseline pb-3 spell-level">
                        <h3 className="section-title"><b><u>{SPELL_NAMES[spellLevel]}</u></b></h3>

                        <div className="dropdown">
                          <button
                            className="btn dropdown-toggle button-menu-jump to-spell"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Jump to spell
                          </button>

                          {/* Use the spell level to get the keys of the spells */}
                          {Object.keys(jumpToSpell).length === 0 ? null :
                            <ul className="dropdown-menu">
                              {Object.keys(jumpToSpell[spellLevel])?.map((key, index) => (
                                <li key={index} className="btn dropdown-item" onClick={() => scrollToListItem(jumpToSpell[spellLevel][key], document, window, OFFSET_SPELL_NAME)}>{key}</li>
                              ))}
                            </ul>
                          }
                        </div>
                      </div>

                      {character.spells[spellLevel]?.map((spell, spellIndex) => (
                        <div key={spellIndex} id={makeIdFromSpell(spellLevel, spell.name)}>
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
                    </div>
                  </div >
                }
              </>
            }
          </>
        ))}
      </div>
    </div >
  )
}

Spells.propTypes = {
  character: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingSpells: PropTypes.bool,
}