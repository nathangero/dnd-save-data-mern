import PropTypes from "prop-types";
import { Character } from "../../models/Character";

import "./style.css";

export default function CharacterPage(props) {
  const character = new Character(props.character);
  
  return(
    <div className="character-page">
      <p>{character.name}</p>
    </div>
  )
}

CharacterPage.propTypes = {
  character: PropTypes.object
}