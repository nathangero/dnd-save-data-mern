import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../models/Character";

export default function Equipment(props) {
  const character = new Character(props.character);

  return (
    <>
      <div className="d-flex">
        <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-equipment" aria-expanded="false" aria-controls="character-view-equipment">
          Equipment
        </h2>
        <button className="btn btn-secondary button-edit">Edit</button>

      </div>

      <div id="character-view-equipment" className="collapse show">
        <div className="card card-body">
          Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
        </div>
      </div>
    </>
  )
}

Equipment.propTypes = {
  character: PropTypes.object
}