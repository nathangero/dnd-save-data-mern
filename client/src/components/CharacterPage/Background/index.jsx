// import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";

export default function Background({ char, toggleSectionShowing, isEditing }) {
  const character = new Character(char);

  return (
    <>
      <h1>{character.name}</h1>
      <p>{character.race}</p>
      <p>{character.class}</p>
      <p>{character.background}</p>
      <p>{character.alignment}</p>
    </>
  )
}

Background.propTypes = {
  character: PropTypes.object,
  isEditing: PropTypes.bool,
}