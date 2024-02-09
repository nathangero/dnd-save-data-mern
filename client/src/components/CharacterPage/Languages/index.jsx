import "./style.css";
import PropTypes from "prop-types";
import Alert from "../../Alert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { CHARACTER_VIEW_ID, LANGUAGE_TYPES, SECTION_TITLE, SECTION_TITLE_NAME } from "../../../utils/enums";
import { UPDATE_CHARACTER } from "../../../utils/mutations";
import { CHARACTER_ACTIONS } from "../../../redux/reducer";
import { capitalizeFirst, makeIdFromName, onChangeExistingString, updateCharacter } from "../../../utils/shared-functions";
import { LANGUAGE_KEYS } from "../../../utils/db-keys";

export default function Languages({ char, toggleSectionShowing, isShowingLanguages, toggleEditing, isEditing }) {
  const character = { ...char }

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  const [languages, setLanguages] = useState(character.languages);
  const [languageName, setLanguageName] = useState("");
  const [languageProficiency, setLanguageProficiency] = useState("");

  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-languages").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));
  }, [])

  // Disables "Add Feat/Trait" button if form isn't filled out
  useEffect(() => {
    let addButton = document.querySelector(".button-add-language");
    if (addButton && languageName) addButton.removeAttribute("disabled");
    else if (addButton) addButton.setAttribute("disabled", null);
  }, [languageName]);


  // Reset the local variable when starting to edit
  useEffect(() => {
    if (isEditing) setLanguages(character.languages);
  }, [isEditing])


  const onChangeLanguageName = ({ target }) => {
    setLanguageName(target.value);
  }

  const onChangeLanguageProficiency = ({ target }) => {
    setLanguageProficiency(target.value);
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
      [LANGUAGE_KEYS.NAME]: languageName,
      [LANGUAGE_KEYS.PROFICIENCY]: languageProficiency.toLowerCase(),
    }

    // Create a copy of the feats
    const updatedList = [...character.languages];
    updatedList.push(newEntry); // Add the new feat
    character.languages = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.LANGUAGES, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update local variable
      setLanguages(character.languages);

      setLanguageName("");
      setLanguageProficiency("");
    }
  }

  const onClickUpdate = async () => {
    character.languages = languages; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.LANGUAGES, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update local variable
      setLanguages(character.languages);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.LANGUAGES);
      if (sectionElement) {
        const sectionTop = sectionElement.getBoundingClientRect().top;
        const adjustedScrollTop = sectionTop + window.scrollY - 50;
        window.scrollTo({ top: adjustedScrollTop, behavior: 'instant' });
      }
    }
  }

  const onClickDelete = async (indexToRemove) => {
    // Filter out the feat to remove;
    const updatedList = languages.filter((_, index) => index !== indexToRemove);
    character.languages = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.LANGUAGES, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update local variable
      setLanguages(character.languages);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.LANGUAGES);
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
        <form className="new-entry language" onSubmit={onClickUpdateCharacter}>
          <input className="edit-input title" value={languageName} onChange={onChangeLanguageName} placeholder="New Language" />

          <div className="stat-row">
            <p>Proficiency</p>
            <select value={languageProficiency} onChange={onChangeLanguageProficiency}>
              {Object.values(LANGUAGE_TYPES).map((type, index) => (
                <option key={index}>{capitalizeFirst(type)}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn fs-3 button-update button-add-language" disabled>Add Language</button>
          <hr />
        </form>

        {languages?.map((item, index) => (
          <div key={index} id={makeIdFromName(item[LANGUAGE_KEYS.NAME])}>
            <div className="stat-row">
              <input className="edit-input title" value={item[LANGUAGE_KEYS.NAME]} onChange={(e) => onChangeExistingString(index, e.target.value, languages, setLanguages, LANGUAGE_KEYS.NAME)} placeholder="Language Name" />

              <select value={capitalizeFirst(item[LANGUAGE_KEYS.PROFICIENCY])} onChange={(e) => onChangeExistingString(index, e.target.value, languages, setLanguages, LANGUAGE_KEYS.PROFICIENCY)}>
                {Object.values(LANGUAGE_TYPES).map((type, index) => (
                  <option key={index}>{capitalizeFirst(type)}</option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-center">
              <button type="button" className="btn fs-3 button-delete button-add-feat" onClick={() => onClickDelete(index)}>Delete</button>
            </div>
            <hr />
          </div>
        ))}

        <button type="submit" className="btn fs-3 mt-3 button-update button-add-language" onClick={() => onClickUpdate()}>Update All Languages</button>
      </>
    )
  }

  const renderViewing = () => {

    return (
      <>
        {character.languages?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <div className="stat-row">
              <p>{item.name}</p>
              <b>{capitalizeFirst(item.proficiency)}</b>
            </div>
            <hr />
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.LANGUAGES}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.LANGUAGES}>
          <h2 className="section-title">
            Languages
          </h2>
          {isShowingLanguages ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <button className="btn btn-secondary button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>
      </div>

      <div id={CHARACTER_VIEW_ID.LANGUAGES} className="collapse show">
        {isEditing ?
          renderEditing() :
          renderViewing()
        }
      </div>

      <div className="alert-modal-languages">
        <Alert title={alertTitle} />
      </div>
    </div>
  )
}

Languages.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingLanguages: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}