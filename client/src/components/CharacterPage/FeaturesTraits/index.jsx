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
import { capitalizeFirst, makeIdFromName, makeJumpToForSection, onChangeExistingNumber, onChangeExistingString, scrollToListItem, updateCharacter } from "../../../utils/shared-functions";
import { FEATURE_TRAIT_KEYS } from "../../../utils/db-keys";

export default function FeaturesTraits({ char, toggleSectionShowing, isShowingFeatureTraits, toggleEditing, isEditing }) {
  const character = { ...char }

  const [jumpToMenu, setMenu] = useState({});

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  const [featureTraits, setFeatsTraits] = useState(character.featureTraits);
  const [featName, setFeatName] = useState("");
  const [featUses, setFeatUses] = useState("");
  const [featTraitType, setFeatTraitType] = useState("");
  const [featActionType, setFeatActionType] = useState("");
  const [featDescription, setFeatDescription] = useState("");

  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-feats-traits").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));

    // Make jump to menu
    setMenu(makeJumpToForSection(character.featureTraits));
  }, []);


  // Disables "Add Feat/Trait" button if form isn't filled out
  useEffect(() => {
    let addButton = document.querySelector(".button-add-feat");
    if (addButton && featName && featUses && featTraitType && featActionType) addButton.removeAttribute("disabled");
    else if (addButton) addButton.setAttribute("disabled", null);
  }, [featName, featUses, featTraitType, featActionType]);
  
  // Reset the local variable when starting to edit
  useEffect(() => {
    if (isEditing) setFeatsTraits(character.featureTraits);
  }, [isEditing])


  const onChangeFeatName = ({ target }) => {
    setFeatName(target.value);
  }

  const onChangeFeatUses = ({ target }) => {
    const num = Number(target.value);

    // Check if the input is a number. If not, then don't update the state value
    if (isNaN(num)) setFeatUses("");
    else setFeatUses(num);
  }

  const onChangeFeatTraitType = ({ target }) => {
    setFeatTraitType(target.value);
  }

  const onChangeFeatActionType = ({ target }) => {
    // If the feat is passive, then automatically set the use to a high number
    if (target.value.toLowerCase() === ACTION_TYPES.PASSIVE) setFeatUses(999);

    setFeatActionType(target.value);
  }

  const onChangeFeatDescription = ({ target }) => {
    setFeatDescription(target.value);
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
      actionType: featActionType.toLowerCase(),
      description: featDescription,
      name: featName,
      traitType: featTraitType.toLowerCase(),
      uses: featUses
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

      // Update local variable
      setFeatsTraits(character.featureTraits);

      setFeatName("");
      setFeatUses("");
      setFeatTraitType("");
      setFeatActionType("");
      setFeatDescription("");
    }
  }

  const onClickUpdateFeat = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    character.featureTraits = featureTraits; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.FEATURES_TRAITS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });
      
      // Update jump to menu
      setMenu(makeJumpToForSection(character.featureTraits));

      // Update local variable
      setFeatsTraits(character.featureTraits);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.FEATURES_TRAITS);
      if (sectionElement) {
        const sectionTop = sectionElement.getBoundingClientRect().top;
        const adjustedScrollTop = sectionTop + window.scrollY - 50;
        window.scrollTo({ top: adjustedScrollTop, behavior: 'instant' });
      }
    }
  }

  const onClickDeleteFeat = async (indexToRemove) => {
    // Filter out the feat to remove;
    const updatedList = featureTraits.filter((_, index) => index !== indexToRemove);
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

      // Update local variable
      setFeatsTraits(character.featureTraits);

      // Scroll to the top of the section
      const sectionElement = document.getElementById(SECTION_TITLE.FEATURES_TRAITS);
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
        <form className="new-entry feats" onSubmit={onClickUpdateCharacter}>
          <input className="edit-input title" value={featName} onChange={onChangeFeatName} placeholder="New Feat/Trait" />

          <div className="stat-row">
            <p>Trait Type</p>
            <select value={featTraitType} onChange={onChangeFeatTraitType} >
              {Object.values(FEAT_TRAIT_TYPES).map((type, index) => (
                <option key={index}>{capitalizeFirst(type)}</option>
              ))}
            </select>
          </div>

          <div className="stat-row">
            <p>Action Type</p>
            <select value={featActionType} onChange={onChangeFeatActionType} >
              {Object.values(ACTION_TYPES).map((type, index) => (
                <option key={index}>{capitalizeFirst(type)}</option>
              ))}
            </select>
          </div>

          <div className="stat-row">
            <p># of Uses</p>
            <input className="edit-input" type="number" inputMode="numeric" value={featUses} onChange={onChangeFeatUses} placeholder="" />
          </div>

          <textarea className="rounded p-1 mb-4" value={featDescription} onChange={onChangeFeatDescription} rows={4} placeholder="How does this work?" />

          <button type="submit" className="btn fs-3 button-update button-add-feat" disabled>Add Feat/Trait</button>

          <hr />
        </form>

        {featureTraits?.map((item, index) => (
          <div key={index} id={makeIdFromName(featureTraits[index][FEATURE_TRAIT_KEYS.NAME])}>
            <form className="new-entry feats" onSubmit={onClickUpdateFeat}>
              <input className="edit-input title" value={item[FEATURE_TRAIT_KEYS.NAME]} onChange={(e) => onChangeExistingString(index, e.target.value, featureTraits, setFeatsTraits, FEATURE_TRAIT_KEYS.NAME)} placeholder="Feat/Trait Name" />

              <div className="stat-row">
                <p>Trait Type</p>
                <select value={capitalizeFirst(item[FEATURE_TRAIT_KEYS.TRAIT])} onChange={(e) => onChangeExistingString(index, e.target.value, featureTraits, setFeatsTraits, FEATURE_TRAIT_KEYS.TRAIT)} >
                  {Object.values(FEAT_TRAIT_TYPES).map((type, index) => (
                    <option key={index}>{capitalizeFirst(type)}</option>
                  ))}
                </select>
              </div>

              <div className="stat-row">
                <p>Action Type</p>
                <select value={capitalizeFirst(item[FEATURE_TRAIT_KEYS.ACTION])} onChange={(e) => onChangeExistingString(index, e.target.value, featureTraits, setFeatsTraits, FEATURE_TRAIT_KEYS.ACTION)} >
                  {Object.values(ACTION_TYPES).map((type, index) => (
                    <option key={index}>{capitalizeFirst(type)}</option>
                  ))}
                </select>
              </div>

              <div className="stat-row">
                <p># of Uses</p>
                <input className="edit-input" type="number" inputMode="numeric" value={item[FEATURE_TRAIT_KEYS.USES]} onChange={(e) => onChangeExistingNumber(index, e.target.value, featureTraits, setFeatsTraits, FEATURE_TRAIT_KEYS.USES)} placeholder="" />
              </div>

              <textarea className="rounded p-1 mb-4" value={item[FEATURE_TRAIT_KEYS.DESCRIPTION]} onChange={(e) => onChangeExistingString(index, e.target.value, featureTraits, setFeatsTraits, FEATURE_TRAIT_KEYS.DESCRIPTION)} rows={4} placeholder="How does this work?" />

              <div className="d-flex justify-content-evenly">
                <button type="button" className="btn fs-3 button-delete button-add-feat" onClick={() => onClickDeleteFeat(index)}>Delete</button>
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
        {character.featureTraits?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <h3><u>{item.name}</u></h3>
            <div className="stat-row">
              <p>Uses</p>
              <b>{item.uses}</b>
            </div>
            <div className="stat-row">
              <p>Trait Type</p>
              <b>{capitalizeFirst(item.traitType)}</b>
            </div>
            <div className="stat-row">
              <p>Action Type</p>
              <b>{capitalizeFirst(item.actionType)}</b>
            </div>
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
        <div className="d-flex " role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.FEATURES_TRAITS}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.FEATURES_TRAITS}>
          <h2 className="section-title feats">
            Feats & Traits
          </h2>
          {isShowingFeatureTraits ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="dropdown">
          <div className="d-flex align-items-baseline justify-content-between w-100">
            <button className="btn button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>

            <button
              className={isShowingFeatureTraits ? "btn dropdown-toggle button-menu-jump ms-3" : "btn dropdown-toggle button-menu-jump ms-3 hide-dropdown"}
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

      <div id={CHARACTER_VIEW_ID.FEATURES_TRAITS} className="collapse show">
        {isEditing ?
          renderEditing() :
          renderViewing()
        }
      </div>

      <div className="alert-modal-feats-traits">
        <Alert title={alertTitle} />
      </div>
    </div>
  )
}

FeaturesTraits.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingFeatureTraits: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}