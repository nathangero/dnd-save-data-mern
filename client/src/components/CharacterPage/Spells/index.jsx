import "./style.css";
import PropTypes from "prop-types";
import Alert from "../../Alert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { CHARACTER_VIEW_ID, SECTION_TITLE_NAME, SPELL_DURATION_TYPES, SPELL_LEVEL_KEYS, SPELL_LEVEL_NAMES, SPELL_LEVEL_NAMES_TO_KEY } from "../../../utils/enums";
import { UPDATE_CHARACTER } from "../../../utils/mutations";
import { CHARACTER_ACTIONS } from "../../../redux/reducer";
import { capitalizeFirst, scrollToListItem, updateCharacter } from "../../../utils/shared-functions";
import SpellList from "./spellList";
import { SPELL_KEYS } from "../../../utils/db-keys";

export default function Spells({ char, toggleSectionShowing, isShowingSpells, toggleEditing, isEditing }) {
  const character = { ...char }

  const [jumpToLevel, setMenu] = useState({});

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  const [castingTime, setCastingTime] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [durationType, setDurationType] = useState("");
  const [spellLevel, setSpellLevel] = useState("");
  const [name, setName] = useState("");
  const [range, setRange] = useState("");

  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-spells").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));

    // Make jump to menu
    setMenu(makeJumpToForSpellLevel());
  }, [])

  // Disables "Add Feat/Trait" button if form isn't filled out
  useEffect(() => {
    let addButton = document.querySelector(".button-add-spell");
    if (addButton && castingTime && (duration >= 0) && durationType && name && range) addButton.removeAttribute("disabled");
    else if (addButton) addButton.setAttribute("disabled", null);
  }, [castingTime, duration, durationType, name, range]);


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

    Object.keys(character?.spells)?.map(spellLevel => {
      if (!SPELL_LEVEL_NAMES[spellLevel]) return; // Ignore _typename and _id
      if (!character?.spells[spellLevel].length > 0) return; // Ignore any spell level that doesn't have spells
      const id = makeIdFromSpellLevel(spellLevel);
      jumpToMenu[SPELL_LEVEL_NAMES[spellLevel]] = id; // Add the new name with its div id
    });

    return jumpToMenu;
  }

  const onChangeCastingTime = ({ target }) => {
    const num = Number(target.value);

    // Check if the input is a number. If not, then don't update the state value
    if (isNaN(num) || num < 0) setCastingTime("");
    setCastingTime(num);
  }

  const onChangeDescription = ({ target }) => {
    setDescription(target.value);
  }

  const onChangeDuration = ({ target }) => {
    const num = Number(target.value);

    // Check if the input is a number. If not, then don't update the state value
    if (isNaN(num) || num < 0) setDuration("");
    setDuration(num);
  }

  const onChangeDurationType = ({ target }) => {
    // If the Duration Type is "instant" then the cast duration is 0 seconds.
    if (target.value.toLowerCase() === SPELL_DURATION_TYPES.INSTANT) setDuration(0);
    setDurationType(target.value);
  }

  const onChangeSpellLevel = ({ target }) => {
    setSpellLevel(target.value);
  }

  const onChangeName = ({ target }) => {
    setName(target.value);
  }

  const onChangeRange = ({ target }) => {
    const num = Number(target.value);

    // Check if the input is a number. If not, then don't update the state value
    if (isNaN(num) || num < 0) setRange("");
    setRange(num);
  }



  /**
   * First, updates the `character` variable's value.
   * Second, calls the `updateCharacter()` function to push the changes to the db.
   * Lastly, if the update worked, then update the redux store with the updated `character` value.
   * 
   * If there's an error during `updateCharacter` then an alert dialogue will pop up notifying the user.
   */
  const onClickUpdateCharacter = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const newEntry = {
      [SPELL_KEYS.CASTING_TIME]: castingTime,
      [SPELL_KEYS.DESCRIPTION]: description,
      [SPELL_KEYS.DURATION]: duration,
      [SPELL_KEYS.DURATION_TYPE]: durationType.toLowerCase(),
      [SPELL_KEYS.NAME]: name,
      [SPELL_KEYS.RANGE]: range,
    }

    // Get the cooresponding level db key
    const level = SPELL_LEVEL_NAMES_TO_KEY[spellLevel];

    // Create a copy
    const updatedSpells = { ...character.spells }
    const levelCopy = [...updatedSpells[level]]
    levelCopy.push(newEntry); // Update the level with the new spell
    updatedSpells[level] = levelCopy; // Update the copied list
    character.spells = updatedSpells; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.SPELLS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setMenu(makeJumpToForSpellLevel());

      setCastingTime("");
      setDescription("");
      setDuration("");
      setDurationType("");
      setName("");
      setRange("");
    }
  }


  const renderEditing = () => {
    return (
      <>
        <form className="new-entry spell" onSubmit={onClickUpdateCharacter}>
          <input className="edit-input title" value={name} onChange={onChangeName} placeholder="New Spell" />

          <div className="stat-row">
            <p>Level</p>
            <select value={spellLevel} onChange={onChangeSpellLevel}>
              <option></option>
              {Object.values(SPELL_LEVEL_KEYS).map((type, index) => (
                <option key={index}>{SPELL_LEVEL_NAMES[type]}</option>
              ))}
            </select>
          </div>

          <div className="stat-row">
            <p>Cast Time</p>
            <div className="d-flex flex-row align-items-baseline">
              <input className="edit-input me-2" type="number" inputMode="numeric" value={castingTime} onChange={onChangeCastingTime} placeholder="" />
              <p>action(s)</p>
            </div>
          </div>

          <div className="stat-row">
            <p>Duration</p>
            <div className="d-flex flex-row align-items-baseline">
              <input className="edit-input me-2" type="number" inputMode="numeric" value={duration} onChange={onChangeDuration} placeholder="" />

              <select value={durationType} onChange={onChangeDurationType}>
                <option></option>
                {Object.values(SPELL_DURATION_TYPES).map((type, index) => (
                  <option key={index}>{capitalizeFirst(type)}</option>
                ))}
              </select>
            </div>
          </div>


          <div className="stat-row">
            <p>Range</p>
            <div className="d-flex flex-row align-items-baseline">
              <input className="edit-input me-2" type="number" inputMode="numeric" value={range} onChange={onChangeRange} placeholder="" />
              <p>ft</p>
            </div>
          </div>


          <textarea className="rounded p-1 mb-4" value={description} onChange={onChangeDescription} rows={4} placeholder="Spell Details" />

          <button type="submit" className="btn fs-3 button-update button-add-spell" disabled>Add Spell</button>
          <hr />
        </form>
      </>
    )
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
        {!isEditing ? null :
          renderEditing()
        }

        {character.spells[SPELL_LEVEL_KEYS.CANTRIPS]?.length === 0 ? null :
          <SpellList char={char} spellLevel={SPELL_LEVEL_KEYS.CANTRIPS} isEditing={isEditing} toggleEditing={toggleEditing} setAlertTitle={setAlertTitle} modalAlert={modalAlert}/>
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_1]?.length === 0 ? null :
          <SpellList char={char} spellLevel={SPELL_LEVEL_KEYS.LEVEL_1} isEditing={isEditing} toggleEditing={toggleEditing} setAlertTitle={setAlertTitle} modalAlert={modalAlert}/>
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_2]?.length === 0 ? null :
          <SpellList char={char} spellLevel={SPELL_LEVEL_KEYS.LEVEL_2} isEditing={isEditing} toggleEditing={toggleEditing} setAlertTitle={setAlertTitle} modalAlert={modalAlert}/>
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_3]?.length === 0 ? null :
          <SpellList char={char} spellLevel={SPELL_LEVEL_KEYS.LEVEL_3} isEditing={isEditing} toggleEditing={toggleEditing} setAlertTitle={setAlertTitle} modalAlert={modalAlert}/>
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_4]?.length === 0 ? null :
          <SpellList char={char} spellLevel={SPELL_LEVEL_KEYS.LEVEL_4} isEditing={isEditing} toggleEditing={toggleEditing} setAlertTitle={setAlertTitle} modalAlert={modalAlert}/>
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_5]?.length === 0 ? null :
          <SpellList char={char} spellLevel={SPELL_LEVEL_KEYS.LEVEL_5} isEditing={isEditing} toggleEditing={toggleEditing} setAlertTitle={setAlertTitle} modalAlert={modalAlert}/>
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_6]?.length === 0 ? null :
          <SpellList char={char} spellLevel={SPELL_LEVEL_KEYS.LEVEL_6} isEditing={isEditing} toggleEditing={toggleEditing} setAlertTitle={setAlertTitle} modalAlert={modalAlert}/>
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_7]?.length === 0 ? null :
          <SpellList char={char} spellLevel={SPELL_LEVEL_KEYS.LEVEL_7} isEditing={isEditing} toggleEditing={toggleEditing} setAlertTitle={setAlertTitle} modalAlert={modalAlert}/>
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_8]?.length === 0 ? null :
          <SpellList char={char} spellLevel={SPELL_LEVEL_KEYS.LEVEL_8} isEditing={isEditing} toggleEditing={toggleEditing} setAlertTitle={setAlertTitle} modalAlert={modalAlert}/>
        }

        {character.spells[SPELL_LEVEL_KEYS.LEVEL_9]?.length === 0 ? null :
          <SpellList char={char} spellLevel={SPELL_LEVEL_KEYS.LEVEL_9} isEditing={isEditing} toggleEditing={toggleEditing} setAlertTitle={setAlertTitle} modalAlert={modalAlert}/>
        }
      </div>

      <div className="alert-modal-spells">
        <Alert title={alertTitle} />
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