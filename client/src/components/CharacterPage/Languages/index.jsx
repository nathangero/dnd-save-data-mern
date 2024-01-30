import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { makeIdFromName } from "../../../utils/shared-functions";
import { CHARACTER_VIEW_ID } from "../../../utils/enums";

export default function Languages({ char, toggleSectionShowing, isShowingLanguages, toggleEditing, isEditing }) {
  const character = { ...char }

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
          {character.languages?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <div className="stat-row">
              <p>{item.name}</p>
              <b>{item.proficiency}</b>
            </div>
            <hr />
          </div>
        ))}
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