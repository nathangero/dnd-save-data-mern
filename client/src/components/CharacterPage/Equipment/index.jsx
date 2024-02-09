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
import { makeIdFromName, makeJumpToForSection, onChangeExistingNumber, onChangeExistingString, scrollToListItem, updateCharacter } from "../../../utils/shared-functions";
import { EQUIPMENT_KEYS } from "../../../utils/db-keys";

export default function Equipment({ char, toggleSectionShowing, isShowingEquipment, toggleEditing, isEditing }) {
  const character = { ...char }

  const [jumpToMenu, setMenu] = useState({});

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  const [equipment, setEquipment] = useState(character.equipment);
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentAmount, setEquipmentAmount] = useState("");
  const [equipmentDescription, setEquipmentDescription] = useState("");

  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-equipment").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));

    // Make jump to menu
    setMenu(makeJumpToForSection(character.equipment));
  }, [])


  // Disables "Add Equipment" button if form isn't filled out
  useEffect(() => {
    let addButton = document.querySelector(".button-add-treasure");
    if (addButton && equipmentName && equipmentAmount) addButton.removeAttribute("disabled");
    else if (addButton) addButton.setAttribute("disabled", null);
  }, [equipmentName, equipmentAmount]);


  // Reset the local variable when starting to edit
  useEffect(() => {
    if (isEditing) setEquipment(character.equipment);
  }, [isEditing])


  const onChangeEquipmentName = ({ target }) => {
    setEquipmentName(target.value);
  }

  const onChangeEquipmentAmount = ({ target }) => {
    const num = Number(target.value);

    // Check if the input is a number. If not, then don't update the state value
    if (isNaN(num)) setEquipmentAmount("");
    else setEquipmentAmount(num);
  }

  const onChangeEquipmentDescription = ({ target }) => {
    setEquipmentDescription(target.value);
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
      [EQUIPMENT_KEYS.NAME]: equipmentName,
      [EQUIPMENT_KEYS.AMOUNT]: equipmentAmount,
      [EQUIPMENT_KEYS.DESCRIPTION]: equipmentDescription,
    }

    // Create a copy of the feats
    const updatedList = [...character.equipment];
    updatedList.push(newEntry); // Add the new feat
    character.equipment = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.EQUIPMENT, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setMenu(makeJumpToForSection(character.equipment));

      // Update local variable
      setEquipment(character.equipment);

      setEquipmentName("");
      setEquipmentDescription("");
    }
  }

  const onClickUpdateExiting = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    character.equipment = equipment; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.EQUIPMENT, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setMenu(makeJumpToForSection(character.equipment));

      // Update local variable
      setEquipment(character.equipment);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.EQUIPMENT);
      if (sectionElement) {
        const sectionTop = sectionElement.getBoundingClientRect().top;
        const adjustedScrollTop = sectionTop + window.scrollY - 50;
        window.scrollTo({ top: adjustedScrollTop, behavior: 'instant' });
      }
    }
  }

  const onClickDelete = async (indexToRemove) => {
    // Filter out the feat to remove;
    const updatedList = equipment.filter((_, index) => index !== indexToRemove);
    character.equipment = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.EQUIPMENT, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setMenu(makeJumpToForSection(character.equipment));

      // Update local variable
      setEquipment(character.equipment);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.EQUIPMENT);
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
        <form className="new-entry equipment" onSubmit={onClickUpdateCharacter}>
          <input className="edit-input title" value={equipmentName} onChange={onChangeEquipmentName} placeholder="New Equipment" />

          <div className="stat-row">
            <p>Amount</p>
            <input className="edit-input" type="number" inputMode="numeric" value={equipmentAmount} onChange={onChangeEquipmentAmount} placeholder="" />
          </div>

          <textarea className="rounded p-1 mb-4" value={equipmentDescription} onChange={onChangeEquipmentDescription} rows={4} placeholder="What is it?" />

          <button type="submit" className="btn fs-3 button-update button-add-treasure" disabled>Add Treasure</button>
          <hr />
        </form>

        {equipment?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <form className="new-entry equipment" onSubmit={onClickUpdateExiting}>
              <input className="edit-input title" value={item[EQUIPMENT_KEYS.NAME]} onChange={(e) => onChangeExistingString(index, e.target.value, equipment, setEquipment, EQUIPMENT_KEYS.NAME)} placeholder="Treasure Name" />

              <div className="stat-row">
                <p>Amount</p>
                <input className="edit-input" type="number" inputMode="numeric" value={item[EQUIPMENT_KEYS.AMOUNT]} onChange={(e) => onChangeExistingNumber(index, e.target.value, equipment, setEquipment, EQUIPMENT_KEYS.AMOUNT)} placeholder="" />
              </div>

              <textarea className="rounded p-1 mb-4" value={item[EQUIPMENT_KEYS.DESCRIPTION]} onChange={(e) => onChangeExistingString(index, e.target.value, equipment, setEquipment, EQUIPMENT_KEYS.DESCRIPTION)} rows={4} placeholder="What is it?" />

              <div className="d-flex justify-content-evenly">
                <button type="button" className="btn fs-3 button-delete button-add-feat" onClick={() => onClickDelete(index)}>Delete</button>
                <button type="submit" className="btn fs-3 button-update button-add-feat">Update</button>
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
        {character.equipment?.map((item, index) => (
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
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.EQUIPMENT}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.EQUIPMENT}>
          <h2 className="section-title equipment">
            Equipment
          </h2>
          {isShowingEquipment ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="dropdown">
          <div className="d-flex align-items-baseline justify-content-between w-100">
            <button className="btn button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>

            <button
              className={isShowingEquipment ? "btn dropdown-toggle button-menu-jump ms-3" : "btn dropdown-toggle button-menu-jump ms-3 hide-dropdown"}
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

      <div id={CHARACTER_VIEW_ID.EQUIPMENT} className="collapse show">
        {isEditing ?
          renderEditing() :
          renderViewing()
        }
      </div>

      <div className="alert-modal-equipment">
        <Alert title={alertTitle} />
      </div>
    </div>
  )
}

Equipment.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingEquipment: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}