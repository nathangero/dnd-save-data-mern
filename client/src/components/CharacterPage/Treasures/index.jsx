import "./style.css";
import PropTypes from "prop-types";
import Alert from "../../Alert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { CHARACTER_VIEW_ID, SECTION_TITLE, SECTION_TITLE_NAME } from "../../../utils/enums";
import { UPDATE_CHARACTER } from "../../../utils/mutations";
import { CHARACTER_ACTIONS } from "../../../redux/reducer";
import { makeIdFromName, makeJumpToForSection, scrollToListItem, updateCharacter } from "../../../utils/shared-functions";
import { FEATURE_TRAIT_KEYS, TREASURE_KEYS } from "../../../utils/db-keys";

export default function Treasures({ char, toggleSectionShowing, isShowingTreasures, toggleEditing, isEditing }) {
  const character = { ...char }

  const [jumpToMenu, setMenu] = useState({});

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  const [treasures, setTreasures] = useState(character.treasures);
  const [treasureName, setTreasureName] = useState("");
  const [treasureAmount, setTreasureAmount] = useState("");
  const [treasureDescription, setTreasureDescription] = useState("");

  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-treasures").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));

    // Make jump to menu
    setMenu(makeJumpToForSection(character.treasures));
  }, [])


  // Disables "Add Feat/Trait" button if form isn't filled out
  useEffect(() => {
    let addButton = document.querySelector(".button-add-treasure");
    if (addButton && treasureName && treasureAmount) addButton.removeAttribute("disabled");
    else if (addButton) addButton.setAttribute("disabled", null);
  }, [treasureName, treasureAmount]);


  // Reset the local variable when starting to edit
  useEffect(() => {
    if (isEditing) setTreasures(character.treasures);
  }, [isEditing])

  /**
   * Change the name of a Feat/Trait at the specific index with the changed value.
   * @param {Number} index 
   * @param {String} value 
   */
  const onChangeExistingProfName = (index, value) => {
    const updatedList = [...treasures];
    updatedList[index] = { ...updatedList[index], [TREASURE_KEYS.NAME]: value };
    setTreasures(updatedList);
  }

  const onChangeTreasureAmount = ({ target }) => {
    const num = Number(target.value);

    // Check if the input is a number. If not, then don't update the state value
    if (isNaN(num)) setTreasureAmount("");
    else setTreasureAmount(num);
  }

  /**
   * Change the name of a Feat/Trait at the specific index with the changed value.
   * @param {Number} index 
   * @param {String} value 
   */
  const onChangeExistingProfDescription = (index, value) => {
    const updatedList = [...treasures];
    updatedList[index] = { ...updatedList[index], [TREASURE_KEYS.DESCRIPTION]: value };
    setTreasures(updatedList);
  }


  const onChangeTreasureName = ({ target }) => {
    setTreasureName(target.value);
  }

  const onChangeTreasureDescription = ({ target }) => {
    setTreasureDescription(target.value);
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
      [TREASURE_KEYS.NAME]: treasureName,
      [TREASURE_KEYS.AMOUNT]: treasureAmount,
      [TREASURE_KEYS.DESCRIPTION]: treasureDescription,
    }

    // Create a copy of the feats
    const updatedList = [...character.treasures];
    updatedList.push(newEntry); // Add the new feat
    character.treasures = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.TREASURES, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setMenu(makeJumpToForSection(character.treasures));

      // Update local variable
      setTreasures(character.treasures);

      setTreasureName("");
      setTreasureDescription("");
    }
  }

  const onClickUpdate = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    character.treasures = treasures; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.TREASURES, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setMenu(makeJumpToForSection(character.treasures));

      // Update local variable
      setTreasures(character.treasures);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.TREASURES);
      if (sectionElement) {
        const sectionTop = sectionElement.getBoundingClientRect().top;
        const adjustedScrollTop = sectionTop + window.scrollY - 50;
        window.scrollTo({ top: adjustedScrollTop, behavior: 'instant' });
      }
    }
  }

  const onClickDelete = async (indexToRemove) => {
    // Filter out the feat to remove;
    const updatedList = treasures.filter((_, index) => index !== indexToRemove);
    character.treasures = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.TREASURES, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setMenu(makeJumpToForSection(character.treasures));

      // Update local variable
      setTreasures(character.treasures);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.TREASURES);
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
        <form className="new-entry treasure" onSubmit={onClickUpdateCharacter}>
          <input className="edit-input title" value={treasureName} onChange={onChangeTreasureName} placeholder="New Treasure" />

          <div className="stat-row">
            <p>Amount</p>
            <input className="edit-input" type="number" inputMode="numeric" value={treasureAmount} onChange={onChangeTreasureAmount} placeholder="" />
          </div>

          <textarea className="rounded p-1 mb-4" value={treasureDescription} onChange={onChangeTreasureDescription} rows={4} placeholder="What is it?" />

          <button type="submit" className="btn fs-3 button-update button-add-treasure" disabled>Add Treasure</button>
          <hr />
        </form>

        {character.treasures?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <form className="new-entry treasure" onSubmit={onClickUpdateCharacter}>

            </form>
            <h3><u>{item.name} x{item.amount}</u></h3>
            <p className="description">{item.description}</p>

            <hr />
          </div>
        ))}
      </>
    )
  }


  const renderViewing = () => {

    return (
      <>
        {character.treasures?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <h3><u>{item.name} x{item.amount}</u></h3>
            <p className="description">{item.description}</p>

            <hr />
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.TREASURES}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.TREASURES}>
          <h2 className="section-title treasures">
            Treasures
          </h2>
          {isShowingTreasures ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="dropdown">
          <div className="d-flex align-items-baseline justify-content-between w-100">
            <button className="btn button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>

            <button
              className={isShowingTreasures ? "btn dropdown-toggle button-menu-jump ms-3" : "btn dropdown-toggle button-menu-jump ms-3 hide-dropdown"}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Jump to
            </button>

            <ul className="dropdown-menu">
              {Object.keys(jumpToMenu).map((key, index) => (
                <li key={index} className="btn dropdown-item" onClick={() => scrollToListItem(jumpToMenu[key], document, window)}>{key}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id={CHARACTER_VIEW_ID.TREASURES} className="collapse show">
        {isEditing ?
          renderEditing() :
          renderViewing()
        }
      </div>

      <div className="alert-modal-treasures">
        <Alert title={alertTitle} />
      </div>
    </div>
  )
}

Treasures.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingTreasures: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}