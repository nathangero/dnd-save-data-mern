import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../models/Character";

export default function Weapons(props) {
  const character = new Character(props.character);

  return (
    <>
      Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
    </>
  )
}

Weapons.propTypes = {
  character: PropTypes.object
}