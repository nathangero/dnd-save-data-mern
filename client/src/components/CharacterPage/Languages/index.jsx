import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { makeIdFromName } from "../../../utils/shared-functions";

export default function Languages({ char, toggleSectionShowing, isShowingLanguages, isEditing }) {
  const character = new Character(char);

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-languages" aria-expanded="false" aria-controls="character-view-languages">
            <h2 className="section-title">
              Languages
            </h2>
            {isShowingLanguages ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <div id="character-view-languages" className="collapse show">
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
  isEditing: PropTypes.bool,
}