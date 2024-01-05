import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../models/Character";

export default function AbilityScores(props) {
  const character = new Character(props.character);

  return (
    <>
      
    </>
  )
}

AbilityScores.propTypes = {
  character: PropTypes.object
}