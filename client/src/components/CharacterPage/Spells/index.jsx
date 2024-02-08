import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { useEffect, useState } from "react";
import { scrollToListItem } from "../../../utils/shared-functions";
import { CHARACTER_VIEW_ID, SPELL_LEVEL_KEYS, SPELL_LEVEL_NAMES } from "../../../utils/enums";
import SpellList from "./spellList";

export default function Spells({ char, toggleSectionShowing, isShowingSpells, toggleEditing, isEditing }) {
  const character = { ...char }

  const [jumpToLevel, setMenu] = useState({});

  useEffect(() => {
    // Make jump to menu
    setMenu(makeJumpToForSpellLevel());
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
      if (!SPELL_LEVEL_NAMES[spellLevel]) return; // Ignore _typename and _id
      if (!character.spells[spellLevel].length > 0) return; // Ignore any spell level that doesn't have spells
      const id = makeIdFromSpellLevel(spellLevel);
      jumpToMenu[SPELL_LEVEL_NAMES[spellLevel]] = id; // Add the new name with its div id
    });

    return jumpToMenu;
  }

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.SPELLS}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.SPELLS}>
          <h2 className="section-title spells">
            Spells
          </h2>
          {isShowingSpells ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="dropdown">
          <div className="d-flex align-items-baseline">
            <button className="btn button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>

            <button
              className={isShowingSpells ? "btn dropdown-toggle button-menu-jump ms-3" : "btn dropdown-toggle button-menu-jump ms-3 hide-dropdown"}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Jump to level
            </button>

            <ul className="dropdown-menu">
              {Object.keys(jumpToLevel).map((key, index) => (
                <li key={index} className="btn dropdown-item" onClick={() => scrollToListItem(jumpToLevel[key], document, window)}>{key}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id={CHARACTER_VIEW_ID.SPELLS} className="collapse show">
        {character.spells[SPELL_LEVEL_KEYS.CANTRIPS]?.length === 0 ? null :
          <SpellList spells={character.spells[SPELL_LEVEL_KEYS.CANTRIPS]} spellLevel={SPELL_LEVEL_KEYS.CANTRIPS} />
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_1]?.length === 0 ? null :
          <SpellList spells={character.spells[SPELL_LEVEL_KEYS.LEVEL_1]} spellLevel={SPELL_LEVEL_KEYS.LEVEL_1} />
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_2]?.length === 0 ? null :
          <SpellList spells={character.spells[SPELL_LEVEL_KEYS.LEVEL_2]} spellLevel={SPELL_LEVEL_KEYS.LEVEL_2} />
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_3]?.length === 0 ? null :
          <SpellList spells={character.spells[SPELL_LEVEL_KEYS.LEVEL_3]} spellLevel={SPELL_LEVEL_KEYS.LEVEL_3} />
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_4]?.length === 0 ? null :
          <SpellList spells={character.spells[SPELL_LEVEL_KEYS.LEVEL_4]} spellLevel={SPELL_LEVEL_KEYS.LEVEL_4} />
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_5]?.length === 0 ? null :
          <SpellList spells={character.spells[SPELL_LEVEL_KEYS.LEVEL_5]} spellLevel={SPELL_LEVEL_KEYS.LEVEL_5} />
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_6]?.length === 0 ? null :
          <SpellList spells={character.spells[SPELL_LEVEL_KEYS.LEVEL_6]} spellLevel={SPELL_LEVEL_KEYS.LEVEL_6} />
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_7]?.length === 0 ? null :
          <SpellList spells={character.spells[SPELL_LEVEL_KEYS.LEVEL_7]} spellLevel={SPELL_LEVEL_KEYS.LEVEL_7} />
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_8]?.length === 0 ? null :
          <SpellList spells={character.spells[SPELL_LEVEL_KEYS.LEVEL_8]} spellLevel={SPELL_LEVEL_KEYS.LEVEL_8} />
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_9]?.length === 0 ? null :
          <SpellList spells={character.spells[SPELL_LEVEL_KEYS.LEVEL_9]} spellLevel={SPELL_LEVEL_KEYS.LEVEL_9} />
        }
      </div>
    </div >
  )
}

Spells.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingSpells: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}