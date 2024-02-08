import PropTypes from "prop-types";
import Alert from "../../Alert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { SECTION_TITLE, SECTION_TITLE_NAME, SPELL_DURATION_TYPES, SPELL_LEVEL_NAMES } from "../../../utils/enums";
import { UPDATE_CHARACTER } from "../../../utils/mutations";
import { CHARACTER_ACTIONS } from "../../../redux/reducer";
import { capitalizeFirst, makeIdFromName, scrollToListItem, updateCharacter } from "../../../utils/shared-functions";
import { SPELL_KEYS } from "../../../utils/db-keys";

export default function SpellList({ char, spellLevel, isEditing, toggleEditing, setAlertTitle, modalAlert }) {
  const OFFSET_SPELL_NAME = 160;
  const character = { ...char };

  const [jumpToSpell, setJumpSpell] = useState({});

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [spells, setSpells] = useState(character.spells[spellLevel]);

  useEffect(() => {
    // Make jump to menu
    setJumpSpell(makeJumpToSpells());
  }, [])


  // Reset the local variable when starting to edit
  useEffect(() => {
    if (isEditing) setSpells(character.spells[spellLevel]);
  }, [isEditing])

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

    makeSpellObject(spellLevel, fullSpellMenu);
    makeSpellObject(spellLevel, fullSpellMenu);
    makeSpellObject(spellLevel, fullSpellMenu);
    makeSpellObject(spellLevel, fullSpellMenu);
    makeSpellObject(spellLevel, fullSpellMenu);
    makeSpellObject(spellLevel, fullSpellMenu);
    makeSpellObject(spellLevel, fullSpellMenu);
    makeSpellObject(spellLevel, fullSpellMenu);
    makeSpellObject(spellLevel, fullSpellMenu);
    makeSpellObject(spellLevel, fullSpellMenu);

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
    const spellObj = {};

    spells?.map(spell => {
      const id = makeIdFromSpell(spellLevel, spell.name);
      spellObj[spell.name] = id; // Add the new name with its div id
    });

    menu[spellLevel] = spellObj; // Update the menu's spell level with the object of spells
  }


  const onChangeExistingString = (index, value, key) => {
    const updatedList = [...spells];
    updatedList[index] = { ...updatedList[index], [key]: value };
    setSpells(updatedList);
  }

  const onChangeExistingDurationType = (index, value) => {
    const updatedList = [...spells];
    if (value.toLowerCase() === SPELL_DURATION_TYPES.INSTANT) {
      updatedList[index] = { ...updatedList[index], [SPELL_KEYS.DURATION_TYPE]: value, [SPELL_KEYS.DURATION]: 0 };
    } else {
      updatedList[index] = { ...updatedList[index], [SPELL_KEYS.DURATION_TYPE]: value };
    }
    setSpells(updatedList);
  }

  const onChangeExistingNumber = (index, value, key) => {
    // Check if the input is a number. If not, then give it the previous Number value.
    let num = Number(value);
    if (isNaN(num) || num < 0) num = Number(character.spells[spellLevel][index][key]);

    const updatedList = [...spells];
    updatedList[index] = { ...updatedList[index], [key]: num };
    setSpells(updatedList);
  }


  const onClickUpdateExisting = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const allSpells = { ...character.spells }; // get a copy of the spells
    const updatedList = spells; // update the spells in the level
    allSpells[spellLevel] = updatedList; // Update the copy
    character.spells = allSpells; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.SPELLS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setJumpSpell(makeJumpToSpells());

      // Update local variable
      setSpells(character.spells[spellLevel]);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.SPELLS);
      if (sectionElement) {
        const sectionTop = sectionElement.getBoundingClientRect().top;
        const adjustedScrollTop = sectionTop + window.scrollY - 50;
        window.scrollTo({ top: adjustedScrollTop, behavior: 'instant' });
      }
    }
  }

  const onClickDelete = async (indexToRemove) => {
    // Filter out the feat to remove;
    const updatedList = spells.filter((_, index) => index !== indexToRemove);
    character.spells = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.SPELLS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setJumpSpell(makeJumpToSpells());

      // Update local variable
      setSpells(character.spells[spellLevel]);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.SPELLS);
      if (sectionElement) {
        const sectionTop = sectionElement.getBoundingClientRect().top;
        const adjustedScrollTop = sectionTop + window.scrollY - 50;
        window.scrollTo({ top: adjustedScrollTop, behavior: 'instant' });
      }
    }
  }

  const renderEditing = () => {
    return (
      <>
        editing
        {spells?.map((item, index) => (
          <div key={index} id={makeIdFromSpell(spellLevel, item[SPELL_KEYS.NAME])}>
            <form className="new-entry spell" onSubmit={onClickUpdateExisting}>
              <input className="edit-input title" value={item[SPELL_KEYS.NAME]} onChange={(e) => { onChangeExistingString(index, e.target.value, SPELL_KEYS.NAME) }} placeholder="Spell Name" />

              <div className="stat-row">
                <p>Cast Time</p>
                <div className="d-flex flex-row align-items-baseline">
                  <input className="edit-input me-2" type="number" inputMode="numeric" value={item[SPELL_KEYS.CASTING_TIME]} onChange={(e) => onChangeExistingNumber(index, e.target.value, SPELL_KEYS.CASTING_TIME)} placeholder="" />
                  <p>action(s)</p>
                </div>
              </div>

              <div className="stat-row">
                <p>Duration</p>
                <div className="d-flex flex-row align-items-baseline">
                  <input className="edit-input me-2" type="number" inputMode="numeric" value={item[SPELL_KEYS.DURATION]} onChange={(e) => onChangeExistingNumber(index, e.target.value, SPELL_KEYS.DURATION)} placeholder="" />

                  <select value={capitalizeFirst(item[SPELL_KEYS.DURATION_TYPE])} onChange={(e) => { onChangeExistingDurationType(index, e.target.value) }} >
                    {Object.values(SPELL_DURATION_TYPES).map((type, index) => (
                      <option key={index}>{capitalizeFirst(type)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="stat-row">
                <p>Range</p>
                <div className="d-flex flex-row align-items-baseline">
                  <div className="d-flex flex-row align-items-baseline">
                    <input className="edit-input me-2" type="number" inputMode="numeric" value={item[SPELL_KEYS.RANGE]} onChange={(e) => onChangeExistingNumber(index, e.target.value, SPELL_KEYS.RANGE)} placeholder="" />
                    <p>ft</p>
                  </div>

                </div>
              </div>

              <textarea className="rounded p-1 mb-4" value={item[SPELL_KEYS.DESCRIPTION]} onChange={(e) => onChangeExistingString(index, e.target.value, SPELL_KEYS.DESCRIPTION)} rows={4} placeholder="Spell Details" />

              <div className="d-flex justify-content-evenly">
                <button type="button" className="btn fs-3 button-delete button-add-feat" onClick={() => onClickDelete(index)}>Delete</button>
                <button type="submit" className="btn fs-3 button-update button-add-weapon">Update</button>
              </div>
              <hr />
            </form>
          </div>
        ))}
      </>
    )
  }

  const renderViewing = () => {
    return (
      <>
        {spells?.map((spell, spellIndex) => (
          <div key={spellIndex} id={makeIdFromSpell(spellLevel, spell[SPELL_KEYS.NAME])}>
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
        ))}
      </>
    )
  }

  return (
    <div id={makeIdFromSpellLevel(spellLevel)} className="">
      <div className="spell-info">
        <div className="character-view-header sticky-top align-items-baseline pb-3 spell-level">
          <h3 className="section-title"><b><u>{SPELL_LEVEL_NAMES[spellLevel]}</u></b></h3>

          <div className="dropdown">
            <button
              className="btn dropdown-toggle button-menu-jump to-spell"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Jump to spell
            </button>

            {Object.keys(jumpToSpell)?.length === 0 ? null :
              <ul className="dropdown-menu">
                {Object.keys(jumpToSpell[spellLevel])?.map((key, index) => (
                  <li key={index} className="btn dropdown-item" onClick={() => scrollToListItem(jumpToSpell[spellLevel][key], document, window, OFFSET_SPELL_NAME)}>{key}</li>
                ))}
              </ul>
            }
          </div>
        </div>

        {isEditing ?
          renderEditing() :
          renderViewing()
        }
      </div>
    </div >
  )
}

SpellList.propTypes = {
  char: PropTypes.object,
  spellLevel: PropTypes.string,
  isEditing: PropTypes.bool,
  toggleEditing: PropTypes.func,
  setAlertTitle: PropTypes.func,
  modalAlert: PropTypes.object,
}