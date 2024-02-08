import "./style.css";
import PropTypes from "prop-types";
import Alert from "../../Alert";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { CHARACTER_VIEW_ID, SECTION_TITLE, SECTION_TITLE_NAME, SPELL_LEVEL_KEYS, SPELL_LEVEL_NAMES } from "../../../utils/enums";
import { UPDATE_CHARACTER } from "../../../utils/mutations";
import { CHARACTER_ACTIONS } from "../../../redux/reducer";
import { updateCharacter } from "../../../utils/shared-functions";
import { SPELL_SLOT_KEYS } from "../../../utils/db-keys";

export default function SpellSlots({ char, toggleSectionShowing, isShowingSpellSlots, toggleEditing, isEditing }) {
  const character = { ...char }

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  const [spellSlots, setSpellSlots] = useState(character.spellSlots);
  const [spellLevel, setSpellLevel] = useState("");
  const [spellAmount, setSpellAmount] = useState("");


  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-spell-slots").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));

    setSpellLevel(findFirstUnsetLevel());
  }, [])


  // Disables "Add Feat/Trait" button if form isn't filled out
  useEffect(() => {
    let addButton = document.querySelector(".button-add-spell-slot");
    if (addButton && spellAmount) addButton.removeAttribute("disabled");
    else if (addButton) addButton.setAttribute("disabled", null);
  }, [spellAmount]);

  // Reset the local variable when starting to edit
  useEffect(() => {
    if (isEditing) {
      setSpellSlots(character.spellSlots);
      setSpellAmount("");
    }
  }, [isEditing])

  /**
   * Creates a div id from the spell name
   * @param {String} name Feature/Trait name
   * @returns A string of the name lowercased and spaces replacecd with dashes 
   */
  const makeIdFromSpellSlot = (name) => {
    const id = `spell-slot-${name.toLowerCase().split("_").join("-")}`;
    return id;
  }


  /**
   * Gets the key used in the db to store the spell slot data.
   * 
   * Get the first index where the character doesn't have any spell slots. 
   * If a character doesn't have level 2 spell slots, it'll get the index for level 2 spell slots.
   * 
   * Then it uses the enum `SPELL_LEVEL_KEYS` to return the db key of the first spell slot that needs to be added.
   * If a character already has level 1 spell slots, it'll return the key "level_2"
   * 
   * @returns The spell slot db key. E.g. "level_1";
   */
  const findFirstUnsetLevel = () => {
    const index = Object.keys(character.spellSlots).findIndex((level, index) => {
      if (!character.spellSlots[level]) {
        return index;
      }
    })

    return getSpellLevel(index);
  }


  /**
   * Uses the index passed in and return the appropriate Spell Slot db key.
   * 
   * E.g. if index === 1, return "level_1"
   *      if index === 2, return "level_2"
   * 
   * Since Cantrips don't have spell slots, it's completely ignored.
   * 
   * @param {Number} index 
   * @returns A spell slot key. E.g. "level_1"
   */
  const getSpellLevel = (index) => {
    const key = Object.keys(SPELL_LEVEL_KEYS)[index];
    return SPELL_LEVEL_KEYS[key];
  }


  /**
   * Change the name of a Spell Slot given the specific level, current and max count.
   * @param {Number} index 
   * @param {String} value 
   */
  const onChangeExistingSpellSlotCurrent = (index, current, max) => {
    let maxNum = Number(max);
    let currentNum = Number(current);
    const level = getSpellLevel(index);

    // If the spell slot current amount is higher than the level's set max, make it equal to the max.
    if (currentNum > maxNum) currentNum = maxNum;

    const updatedSlot = { [SPELL_SLOT_KEYS.CURRENT]: currentNum, [SPELL_SLOT_KEYS.MAX]: maxNum }
    const updatedList = { ...spellSlots, [level]: updatedSlot };
    setSpellSlots(updatedList);
  }

  /**
   * Change the name of a Spell Slot given the specific level, current and max count.
   * @param {Number} index 
   * @param {String} value 
   */
  const onChangeExistingSpellSlotMax = (index, max) => {
    const level = getSpellLevel(index);
    let currentNum = spellSlots[level][SPELL_SLOT_KEYS.CURRENT];
    let maxNum = Number(max);

    // If the spell slot current amount is higher than the level's set max, make it equal to the max.
    if (currentNum > maxNum) currentNum = maxNum;

    const updatedSlot = { [SPELL_SLOT_KEYS.CURRENT]: currentNum, [SPELL_SLOT_KEYS.MAX]: maxNum }
    const updatedList = { ...spellSlots, [level]: updatedSlot };
    setSpellSlots(updatedList);
  }


  const onChangeSpellAmount = ({ target }) => {
    const num = Number(target.value);

    // Check if the input is a number. If not, then don't update the state value
    if (isNaN(num)) setSpellAmount("");
    else setSpellAmount(num);
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
      [SPELL_SLOT_KEYS.CURRENT]: spellAmount,
      [SPELL_SLOT_KEYS.MAX]: spellAmount,
    }

    // Create a copy of the spell slots
    const updatedList = { ...character.spellSlots };
    updatedList[spellLevel] = newEntry; // Add the new spell slot
    character.spellSlots = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.SPELL_SLOTS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update local variable
      setSpellSlots(character.spellSlots);

      setSpellLevel(findFirstUnsetLevel());
      setSpellAmount("");
    }
  }

  const onClickUpdate = async () => {
    character.spellSlots = spellSlots; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.SPELL_SLOTS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update local variable
      setSpellSlots(character.spellSlots);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.SPELL_SLOTS);
      if (sectionElement) {
        const sectionTop = sectionElement.getBoundingClientRect().top;
        const adjustedScrollTop = sectionTop + window.scrollY - 50;
        window.scrollTo({ top: adjustedScrollTop, behavior: 'instant' });
      }
    }
  }

  const onClickDelete = async (indexToRemove) => {
    const updatedList = { ...spellSlots };
    updatedList[getSpellLevel(indexToRemove)] = null;
    character.spellSlots = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.SPELL_SLOTS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update local variable
      setSpellSlots(character.spellSlots);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.SPELL_SLOTS);
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
        {spellSlots[SPELL_LEVEL_KEYS.LEVEL_9] ? // If level 9 slots exist, don't allow adding more.
          <p>No more spell slots to add.</p> :
          <form className="new-entry spell-slot" onSubmit={onClickUpdateCharacter}>
            <div className="stat-row">
              <p>Level #</p>
              <p>{SPELL_LEVEL_NAMES[findFirstUnsetLevel()]}</p>
            </div>

            <div className="stat-row">
              <p>Amount</p>
              <input className="edit-input" type="number" inputMode="numeric" value={spellAmount} onChange={onChangeSpellAmount} placeholder="" />
            </div>

            <button type="submit" className="btn fs-3 button-update button-add-spell-slot" disabled>Add {SPELL_LEVEL_NAMES[spellLevel]} Slot</button>

            <hr />
          </form>
        }

        {Object.keys(spellSlots)?.map((item, index) => (
          <React.Fragment key={index}>
            {!SPELL_LEVEL_NAMES[item] ? null : // Ignore _typename and _id
              <div id={makeIdFromSpellSlot(item)}>
                {!spellSlots[item] ? null :
                  <form className="new-entry spell-slot">
                    <div className="stat-row">
                      <p>{SPELL_LEVEL_NAMES[item]}</p>

                      <div>
                        <input className="edit-input" type="number" inputMode="numeric" value={spellSlots?.[item][SPELL_SLOT_KEYS.CURRENT]} onChange={(e) => { onChangeExistingSpellSlotCurrent(index, e.target.value, spellSlots?.[item][SPELL_SLOT_KEYS.MAX]) }} placeholder=""
                        />

                        <b> / </b>

                        <input className="edit-input" type="number" inputMode="numeric" value={spellSlots?.[item][SPELL_SLOT_KEYS.MAX]} onChange={(e) => { onChangeExistingSpellSlotMax(index, e.target.value) }} placeholder="" />
                      </div>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button type="button" className="btn fs-3 button-delete button-add-feat" onClick={() => onClickDelete(index)}>Delete {SPELL_LEVEL_NAMES[getSpellLevel(index)]}</button>
                    </div>
                  </form>
                }
              </div>
            }
          </React.Fragment>
        ))}

        <button type="submit" className="btn fs-3 mt-3 button-update button-add-prof" onClick={() => onClickUpdate()}>Update All Slots</button>
      </>
    )
  }


  const renderViewing = () => {

    return (
      <>
        {Object.keys(character.spellSlots)?.map((item, index) => (
          <React.Fragment key={index}>
            {!SPELL_LEVEL_NAMES[item] ? null : // Ignore _typename and _id
              <div id={makeIdFromSpellSlot(item)} className="d-flex justify-content-between">
                {!character.spellSlots[item] ? null :
                  <>
                    <p>{SPELL_LEVEL_NAMES[item]}</p>
                    <b>{character.spellSlots[item].current}/{character.spellSlots[item].max}</b>
                  </>
                }
              </div>
            }
          </React.Fragment>
        ))}
      </>
    )
  }

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.SPELL_SLOTS}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.SPELL_SLOTS}>
          <h2 className="section-title">
            Spell Slots
          </h2>
          {isShowingSpellSlots ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <button className="btn btn-secondary button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>
      </div>

      <div id={CHARACTER_VIEW_ID.SPELL_SLOTS} className="collapse show">
        {isEditing ?
          renderEditing() :
          renderViewing()
        }
      </div>

      <div className="alert-modal-spell-slots">
        <Alert title={alertTitle} />
      </div>
    </div>
  )
}

SpellSlots.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingSpellSlots: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}