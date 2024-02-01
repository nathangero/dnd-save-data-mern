import "./style.css";
import PropTypes from "prop-types";
import Alert from "../../Alert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { ACTION_TYPES, CHARACTER_VIEW_ID, FEAT_TRAIT_TYPES, SECTION_TITLE, SECTION_TITLE_NAME } from "../../../utils/enums";
import { UPDATE_CHARACTER } from "../../../utils/mutations";
import { CHARACTER_ACTIONS } from "../../../redux/reducer";
import { capitalizeFirst, makeIdFromName, makeJumpToForSection, scrollToListItem, updateCharacter } from "../../../utils/shared-functions";
import { FEATURE_TRAIT_KEYS } from "../../../utils/db-keys";

export default function Proficiencies({ char, toggleSectionShowing, isShowingProficiencies, toggleEditing, isEditing }) {
  const character = { ...char }

  const [jumpToMenu, setMenu] = useState({});

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  const [proficiencies, setProficiencies] = useState(character.proficiencies);
  const [profName, setProfName] = useState("");
  const [profDescription, setProfDescription] = useState("");

  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-proficiencies").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));

    // Make jump to menu
    setMenu(makeJumpToForSection(character.proficiencies));
  }, [])


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
      actionType: profName,
      description: profDescription,
    }

    // Create a copy of the feats
    const updatedList = [...character.featureTraits];
    updatedList.push(newEntry); // Add the new feat
    character.featureTraits = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.FEATURES_TRAITS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setMenu(makeJumpToForSection(character.featureTraits));

      setProfName("");
      setProfDescription("");
    }
  }

  const onClickUpdate = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    character.proficiencies = proficiencies; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.FEATURES_TRAITS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setMenu(makeJumpToForSection(character.proficiencies));

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.FEATURES_TRAITS);
      if (sectionElement) {
        const sectionTop = sectionElement.getBoundingClientRect().top;
        const adjustedScrollTop = sectionTop + window.scrollY - 50;
        window.scrollTo({ top: adjustedScrollTop, behavior: 'instant' });
      }
    }
  }

  const onClickDelete = async (indexToRemove) => {
    // Filter out the feat to remove;
    const updatedList = proficiencies.filter((_, index) => index !== indexToRemove);
    character.featureTraits = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.FEATURES_TRAITS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update jump to menu
      setMenu(makeJumpToForSection(character.featureTraits));

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.FEATURES_TRAITS);
      if (sectionElement) {
        const sectionTop = sectionElement.getBoundingClientRect().top;
        const adjustedScrollTop = sectionTop + window.scrollY - 50;
        window.scrollTo({ top: adjustedScrollTop, behavior: 'instant' });
      }
    }
  }

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.PROFICIENCIES}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.PROFICIENCIES}>
          <h2 className="section-title proficiencies">
            Proficiencies
          </h2>
          {isShowingProficiencies ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="dropdown">
          <div className="d-flex align-items-baseline justify-content-between w-100">
            <button className="btn button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>

            <button
              className={isShowingProficiencies ? "btn dropdown-toggle button-menu-jump ms-3" : "btn dropdown-toggle button-menu-jump ms-3 hide-dropdown"}
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

      <div id={CHARACTER_VIEW_ID.PROFICIENCIES} className="collapse show">
        {character.proficiencies?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <h3><u>{item.name}</u></h3>
            <p className="description">{item.description}</p>

            <hr />
          </div>
        ))}
      </div>

      <div className="alert-modal-proficiencies">
        <Alert title={alertTitle} />
      </div>
    </div>
  )
}

Proficiencies.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingProficiencies: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}