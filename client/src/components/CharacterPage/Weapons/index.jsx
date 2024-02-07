import "./style.css";
import Alert from "../../Alert";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { ABILITY_SCORE_KEYS, ABILITY_SCORE_NAMES, CHARACTER_VIEW_ID, SECTION_TITLE, SECTION_TITLE_NAME } from "../../../utils/enums";
import { UPDATE_CHARACTER } from "../../../utils/mutations";
import { CHARACTER_ACTIONS } from "../../../redux/reducer";
import { calcScoreMod, calcScoreWithProficiency, getScoreName, makeIdFromName, makeJumpToForSection, scrollToListItem, updateCharacter } from "../../../utils/shared-functions";
import { WEAPON_KEYS } from "../../../utils/db-keys";

export default function Weapons({ char, toggleSectionShowing, isShowingWeapons, toggleEditing, isEditing }) {
  const character = { ...char }

  const [jumpToMenu, setMenu] = useState({});

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  const [weapons, setWeapons] = useState(character.weapons);
  const [weaponAmount, setWeaponAmount] = useState("");
  const [weaponAtkDmgScore, setWeaponAtkDmgScore] = useState("");
  const [weaponCategory, setWeaponCategory] = useState("");
  const [weaponDescription, setWeaponDescription] = useState("");
  const [weaponDieType, setWeaponDieType] = useState("");
  const [weaponName, setWeaponName] = useState("");
  const [weaponProficiency, setWeaponProficiency] = useState(false);

  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-weapons").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));

    // Make jump to menu
    setMenu(makeJumpToForSection(character.weapons));
  }, [])

  // Disables "Add Feat/Trait" button if form isn't filled out
  useEffect(() => {
    let addButton = document.querySelector(".button-add-weapon");
    if (addButton && weaponAmount && weaponAtkDmgScore && weaponCategory && weaponDieType && weaponName && weaponProficiency) addButton.removeAttribute("disabled");
    else if (addButton) addButton.setAttribute("disabled", null);
  }, [weaponAmount, weaponAtkDmgScore, weaponCategory, weaponDieType, weaponName, weaponProficiency]);


  // Reset the local variable when starting to edit
  useEffect(() => {
    if (isEditing) setWeapons(character.weapons);
  }, [isEditing])



  const onChangeWeaponName = ({ target }) => {
    setWeaponName(target.value);
  }

  const onChangeWeaponAmount = ({ target }) => {
    setWeaponAmount(target.value);
  }

  const onChangeWeaponAtkDmgStat = ({ target }) => {
    setWeaponAtkDmgScore(target.value);
  }

  const onChangeWeaponCategory = ({ target }) => {
    setWeaponCategory(target.value);
  }

  const onChangeWeaponDescription = ({ target }) => {
    setWeaponDescription(target.value);
  }

  const onChangeWeaponDieType = ({ target }) => {
    setWeaponDieType(target.value);
  }

  const onChangeWeaponProficiency = ({ target }) => {
    setWeaponProficiency(target.value);
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
      [WEAPON_KEYS.AMOUNT]: weaponAmount,
      [WEAPON_KEYS.ATK_DMG_STAT]: weaponAtkDmgScore.toLowerCase(),
      [WEAPON_KEYS.CATEGORY]: weaponCategory,
      [WEAPON_KEYS.DESCRIPTION]: weaponDescription,
      [WEAPON_KEYS.DIE_TYPE]: weaponDieType,
      [WEAPON_KEYS.NAME]: weaponName,
      [WEAPON_KEYS.PROFICIENT]: weaponProficiency,
    }

    // Create a copy of the feats
    const updatedList = [...character.weapons];
    updatedList.push(newEntry); // Add the new feat
    character.weapons = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.LANGUAGES, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update local variable
      setWeapons(character.weapons);

      setWeaponAmount("");
      setWeaponAtkDmgScore("");
      setWeaponCategory("");
      setWeaponDescription("");
      setWeaponDieType("");
      setWeaponName("");
      setWeaponProficiency(false);
    }
  }

  const onClickUpdate = async () => {
    character.weapons = weapons; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.LANGUAGES, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update local variable
      setLanguages(character.weapons);

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
    const updatedList = weapons.filter((_, index) => index !== indexToRemove);
    character.weapons = updatedList; // update the `character` variable

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.LANGUAGES, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });

      // Update local variable
      setLanguages(character.weapons);

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
        <form className="new-entry weapons" onSubmit={onClickUpdateCharacter}>
          <input className="edit-input title" value={weaponName} onChange={onChangeWeaponName} placeholder="New Weapon" />

          <select value={weaponAtkDmgScore} onChange={onChangeWeaponAtkDmgStat}>
            {Object.values(ABILITY_SCORE_KEYS).map((key, index) => (
              <option key={index}>{ABILITY_SCORE_NAMES[key]}</option>
            ))}
          </select>
          <hr />
        </form>

        {character.weapons?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <h3><u>{item.name} x{item.amount}</u></h3>
            <div className="stat-row">
              <p>Attack Mod</p>
              <b>{calcScoreWithProficiency(character.scores[item.attackDamageScore], character.level, item.proficient, true)} ({getScoreName(item.attackDamageScore)})</b>
            </div>
            <div className="stat-row">
              <p>Damage Mod</p>
              <b>{calcScoreMod(character.scores[item.attackDamageScore], true)} ({getScoreName(item.attackDamageScore)})</b>
            </div>
            <div className="stat-row">
              <p>Die Type</p>
              <b>{item.dieType}</b>
            </div>
            <div className="stat-row">
              <p>Category</p>
              <b>{item.category}</b>
            </div>
            <div className="stat-row">
              <p>Proficient?</p>
              <b>{item.proficient ? "Yes" : "No"}</b>
            </div>
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
        {character.weapons?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <h3><u>{item.name} x{item.amount}</u></h3>
            <div className="stat-row">
              <p>Attack Mod</p>
              <b>{calcScoreWithProficiency(character.scores[item.attackDamageScore], character.level, item.proficient, true)} ({getScoreName(item.attackDamageScore)})</b>
            </div>
            <div className="stat-row">
              <p>Damage Mod</p>
              <b>{calcScoreMod(character.scores[item.attackDamageScore], true)} ({getScoreName(item.attackDamageScore)})</b>
            </div>
            <div className="stat-row">
              <p>Die Type</p>
              <b>{item.dieType}</b>
            </div>
            <div className="stat-row">
              <p>Category</p>
              <b>{item.category}</b>
            </div>
            <div className="stat-row">
              <p>Proficient?</p>
              <b>{item.proficient ? "Yes" : "No"}</b>
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
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.WEAPONS}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.WEAPONS}>
          <h2 className="section-title weapons">
            Weapons
          </h2>
          {isShowingWeapons ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="dropdown">
          <div className="d-flex align-items-baseline justify-content-between w-100">
            <button className="btn button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>

            <button
              className={isShowingWeapons ? "btn dropdown-toggle button-menu-jump ms-3" : "btn dropdown-toggle button-menu-jump ms-3 hide-dropdown"}
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

      <div id={CHARACTER_VIEW_ID.WEAPONS} className="collapse show">
        {isEditing ?
          renderEditing() :
          renderViewing()
        }
      </div>

      <div className="alert-modal-weapons">
        <Alert title={alertTitle} />
      </div>
    </div>
  )
}

Weapons.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingWeapons: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}