import "./style.css";
import PropTypes from "prop-types";
import Alert from "../../Alert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { calcScoreWithProficiency, updateCharacter } from "../../../utils/shared-functions";
import { ABILITY_SCORE_KEYS, ABILITY_SCORE_NAMES, CHARACTER_VIEW_ID, SECTION_TITLE_NAME } from "../../../utils/enums";
import { UPDATE_CHARACTER } from "../../../utils/mutations";
import { CHARACTER_ACTIONS } from "../../../redux/reducer";

export default function SavingThrows({ char, toggleSectionShowing, isShowingSavingThrows, toggleEditing, isEditing }) {
  const character = { ...char }

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  let [savingThrows, setSavingThrows] = useState(character.savingThrows);

  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-saving-throws").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));
  }, []);

  /**
   * Updates the state variable `savingThrows` by toggling a boolean.
   * @param {String} score Name of ability score like "str" or "dex"
   */
  const onClickProficient = (score) => {
    setSavingThrows({ ...savingThrows, [score]: !savingThrows[score] });
  }

  /**
   * First, updates the `character` variable's value.
   * Second, calls the `updateCharacter()` function to push the changes to the db.
   * Lastly, if the update worked, then update the redux store with the updated `character` value.
   * 
   * If there's an error during `updateCharacter` then an alert dialogue will pop up notifying the user.
   */
  const onClickUpdateCharacter = async () => {
    character.savingThrows = savingThrows;

    const didUpdate = updateCharacter(character, SECTION_TITLE_NAME.SAVING_THROWS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });
    }
  }

  const renderEditing = () => {
    return (
      <>
        <ul className="list-unstyled">
          {Object.values(ABILITY_SCORE_KEYS).map((score, index) => (
            <li key={index} className="mb-3 stat-row">
              <div className="d-flex">
                <div className="me-3 editing" onClick={() => onClickProficient(score)}>
                  {savingThrows[score] ?
                    <i className="bi bi-p-square"></i> :
                    <i className="bi bi-app"></i>
                  }
                </div>
                <p className="mb-0">{ABILITY_SCORE_NAMES[score]}</p>
              </div>
              <b>{calcScoreWithProficiency(character.scores[score], character.level, savingThrows[score], true)}</b>
            </li>
          ))}
        </ul>

        <button type="button" className="btn fs-3 button-update" onClick={() => onClickUpdateCharacter()}>Update {SECTION_TITLE_NAME.SAVING_THROWS}</button>
      </>
    )
  }

  const renderViewing = () => {
    return (
      <ul className="list-unstyled">
        {Object.values(ABILITY_SCORE_KEYS).map((score, index) => (
          <li key={index} className="mb-3 stat-row">
            <div className="d-flex">
              <div className="me-3">
                {character.savingThrows[score] ?
                  <i className="bi bi-p-square viewing"></i> :
                  <i className="bi bi-app"></i>
                }
              </div>
              <p className="mb-0">{ABILITY_SCORE_NAMES[score]}</p>
            </div>
            <b>{calcScoreWithProficiency(character.scores[score], character.level, character.savingThrows[score], true)}</b>
          </li>
        ))}
      </ul>
    )
  }


  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.SAVING_THROWS}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.SAVING_THROWS}>
          <h2 className="section-title">
            Saving Throws
          </h2>
          {isShowingSavingThrows ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <button className="btn btn-secondary button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>
      </div>

      <div id={CHARACTER_VIEW_ID.SAVING_THROWS} className="collapse show">
        {isEditing ?
          renderEditing() :
          renderViewing()
        }
      </div>

      <div className="alert-modal-saving-throws">
        <Alert title={alertTitle} />
      </div>
    </div>
  )
}

SavingThrows.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingSavingThrows: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}