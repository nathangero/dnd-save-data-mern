import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";

export default function Treasures(props) {
  const character = new Character(props.character);

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
          <div className="d-flex" role="button" onClick={() => props.toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-treasures" aria-expanded="false" aria-controls="character-view-treasures">
            <h2 className="section-title">
              Treasures
            </h2>
            {props.isShowingTreasures ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <div id="character-view-treasures" className="collapse show">
          PLACEHOLDER
        </div>
    </div>
  )
}

Treasures.propTypes = {
  character: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingTreasures: PropTypes.bool,
}