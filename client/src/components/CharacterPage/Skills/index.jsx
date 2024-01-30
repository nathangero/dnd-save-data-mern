import "./style.css";
import PropTypes from "prop-types";
import Alert from "../../Alert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { calcScoreWithProficiency, updateCharacter } from "../../../utils/shared-functions";
import { CHARACTER_VIEW_ID, SECTION_TITLE_NAME, SKILL_KEYS, SKILL_NAMES, SKILL_NAME_SCORES, SKILL_PROFICIENCY } from "../../../utils/enums";
import { UPDATE_CHARACTER } from "../../../utils/mutations";
import { CHARACTER_ACTIONS } from "../../../redux/reducer";

export default function Skills({ char, toggleSectionShowing, isShowingSkills, toggleEditing, isEditing }) {
  const character = { ...char }

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  let [skills, setSkills] = useState(character.skills);

  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-skills").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));
  }, []);

  /**
   * Updates the state variable `savingThrows` by toggling a boolean.
   * @param {String} score Name of ability score like "str" or "dex"
   */
  const onClickProficient = (skill) => {
    const proficient = {
      [SKILL_PROFICIENCY.PROFICIENT]: !skills[skill][SKILL_PROFICIENCY.PROFICIENT],
      [SKILL_PROFICIENCY.EXPERTISE]: false
    }
    setSkills({ ...skills, [skill]: proficient });
  }

  /**
   * Updates the state variable `savingThrows` by toggling a boolean.
   * @param {String} score Name of ability score like "str" or "dex"
   */
  const onClickExpertise = (skill) => {
    const expertise = {
      [SKILL_PROFICIENCY.PROFICIENT]: true,
      [SKILL_PROFICIENCY.EXPERTISE]: !skills[skill][SKILL_PROFICIENCY.EXPERTISE]
    }

    setSkills({ ...skills, [skill]: expertise });
  }

  /**
   * First, updates the `character` variable's value.
   * Second, calls the `updateCharacter()` function to push the changes to the db.
   * Lastly, if the update worked, then update the redux store with the updated `character` value.
   * 
   * If there's an error during `updateCharacter` then an alert dialogue will pop up notifying the user.
   */
  const onClickUpdateCharacter = async () => {
    character.skills = skills;

    const didUpdate = updateCharacter(character, SECTION_TITLE_NAME.SKILLS, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

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
          {Object.values(SKILL_KEYS).map((skill, index) => (
            <li key={index} className="mb-3 stat-row">
              <div className="d-flex">
                <div className="me-3 editing">
                  {skills[skill][SKILL_PROFICIENCY.EXPERTISE] ? // Check for expertise
                    <>
                      <i className="bi bi-p-square me-3" onClick={() => onClickProficient(skill)}></i>
                      <i className="bi bi-p-square expertise" onClick={() => onClickExpertise(skill)}></i>
                    </> :
                    <>
                      {skills[skill][SKILL_PROFICIENCY.PROFICIENT] ?
                        <>
                          <i className="bi bi-p-square me-3" onClick={() => onClickProficient(skill)}></i>
                          <i className="bi bi-app expertise" onClick={() => onClickExpertise(skill)}></i>
                        </> :
                        <>
                          <i className="bi bi-app me-3" onClick={() => onClickProficient(skill)}></i>
                          <i className="bi bi-app expertise" onClick={() => onClickExpertise(skill)}></i>
                        </>
                      }
                    </>
                  }
                </div>
                <p className="mb-0">{SKILL_NAMES[skill]} <i>({SKILL_NAME_SCORES[skill]})</i></p>
              </div>
              <b>{calcScoreWithProficiency(character.scores[SKILL_NAME_SCORES[skill]], character.level, skills[skill], true)}</b>
            </li>
          ))}
        </ul>

        <button type="button" className="btn fs-3 button-update" onClick={() => onClickUpdateCharacter()}>Update {SECTION_TITLE_NAME.SKILLS}</button>
      </>
    )
  }


  const renderViewing = () => {
    return (
      <ul className="list-unstyled">
        {Object.values(SKILL_KEYS).map((skill, index) => (
          <li key={index} className="mb-3 stat-row">
            <div className="d-flex">
              <div className="me-3">
                {skills[skill][SKILL_PROFICIENCY.EXPERTISE] ?
                  <>
                    <i className="bi bi-p-square viewing me-3"></i>
                    <i className="bi bi-p-square viewing expertise"></i>
                  </> :
                  <>
                    {skills[skill][SKILL_PROFICIENCY.PROFICIENT] ?
                      <>
                        <i className="bi bi-p-square viewing me-3"></i>
                        <i className="bi bi-app expertise"></i>
                      </> :
                      <>
                        <i className="bi bi-app me-3"></i>
                        <i className="bi bi-app expertise"></i>
                      </>
                    }
                  </>
                }
              </div>
              <p className="mb-0">{SKILL_NAMES[skill]} <i>({SKILL_NAME_SCORES[skill]})</i></p>
            </div>
            <b>{calcScoreWithProficiency(character.scores[SKILL_NAME_SCORES[skill]], character.level, character.skills[skill], true)}</b>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.SKILLS}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.SKILLS}>
          <h2 className="section-title">
            Skills
          </h2>
          {isShowingSkills ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <button className="btn btn-secondary button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>
      </div>

      <div id={CHARACTER_VIEW_ID.SKILLS} className="collapse show">
        {isEditing ?
          renderEditing() :
          renderViewing()
        }
      </div>

      <div className="alert-modal-skills">
        <Alert title={alertTitle} />
      </div>
    </div>
  )
}

Skills.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingSkills: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}