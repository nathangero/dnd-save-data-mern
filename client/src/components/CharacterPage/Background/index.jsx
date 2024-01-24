// import "./style.css";
import PropTypes from "prop-types";

export default function Background({ char, toggleSectionShowing, toggleEditing, isEditing }) {
  const character = { ...char }

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
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}