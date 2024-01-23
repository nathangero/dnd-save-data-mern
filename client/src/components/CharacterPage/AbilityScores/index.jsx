import "./style.css";
import PropTypes from "prop-types";
import Alert from "../../Alert";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { Character } from "../../../models/Character";
import { calcScoreMod, updateCharacter } from "../../../utils/shared-functions";
import { ABILITY_SCORE_KEYS, ABILITY_SCORE_NAMES, SECTION_TITLE_NAME } from "../../../utils/enums";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CHARACTER } from "../../../utils/mutations";

export default function AbilityScores({ char, toggleSectionShowing, isShowingScores, toggleEditing, isEditing }) {
  const character = new Character(char);

  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  let [scores, setScores] = useState(character.scores);

  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-scores").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));
  }, []);

  const onChangeScore = ({ target }, score) => {
    setScores({ ...scores, [score]: Number(target.value) });
  }

  const onClickUpdateCharacter = async () => {
    character.scores = scores;

    // console.log("scores:", scores);
    // console.log("character scores:", character.scores);
    updateCharacter(character, SECTION_TITLE_NAME.ABILITY_SCORES, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);
  }

  const renderEditing = () => {
    return (
      <>
        {Object.values(ABILITY_SCORE_KEYS).map((score, index) => (
          <div key={index} className="stat-row">
            <p>{ABILITY_SCORE_NAMES[score]}</p>
            <div className="d-flex align-items-baseline">
              <input className="edit-input score" value={scores[score]} onChange={(e) => onChangeScore(e, score)} />
              <b className="score-mod">{calcScoreMod(character.scores[score], true)}</b>
            </div>
          </div>
        ))}

        <button type="button" className="btn fs-3 button-update" onClick={() => onClickUpdateCharacter()}>Update {SECTION_TITLE_NAME.ABILITY_SCORES}</button>
      </>
    )
  }

  const renderViewing = () => {
    return (
      <>
        {Object.values(ABILITY_SCORE_KEYS).map((score, index) => (
          <div key={index} className="stat-row">
            <p>{ABILITY_SCORE_NAMES[score]} <i>({character.scores[score]})</i></p>
            <b>{calcScoreMod(character.scores[score], true)}</b>
          </div>
        ))}
      </>
    )
  }

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-scores" aria-expanded="false" aria-controls="character-view-scores">
          <h2 className="section-title">
            Ability Scores
          </h2>
          {isShowingScores ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <button className="btn btn-secondary button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>
      </div>

      <div id="character-view-scores" className="collapse show">
        {isEditing ?
          renderEditing() :
          renderViewing()
        }
      </div>

      <div className="alert-modal-scores">
        <Alert title={alertTitle} />
      </div>
    </div>
  )
}

AbilityScores.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingScores: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}