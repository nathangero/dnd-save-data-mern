import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../models/Character";

export default function Proficiencies(props) {
  const character = new Character(props.character);

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
          <div className="d-flex" role="button" onClick={() => props.toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-proficiencies" aria-expanded="false" aria-controls="character-view-proficiencies">
            <h2 className="section-title">
              Proficiencies
            </h2>
            {props.isShowingProficiencies ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <div id="character-view-proficiencies" className="collapse show">
          PLACEHOLDER
        </div>
    </div>
  )
}

Proficiencies.propTypes = {
  character: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingProficiencies: PropTypes.bool,
}