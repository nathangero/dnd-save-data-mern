// import "./style.css";
import PropTypes from "prop-types";
import Alert from "../../Alert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { SECTION_TITLE_NAME } from "../../../utils/enums";
import { capitalizeFirst, updateCharacter } from "../../../utils/shared-functions";
import { UPDATE_CHARACTER } from "../../../utils/mutations";
import { CHARACTER_ACTIONS } from "../../../redux/reducer";

export default function Background({ char, toggleEditing, isEditing }) {
  const character = { ...char }

  const dispatch = useDispatch();
  const [updateCharMutation] = useMutation(UPDATE_CHARACTER);

  const [modalAlert, setModalAlert] = useState(null);
  const [alertTitle, setAlertTitle] = useState("");

  const [name, setName] = useState(character.name);
  const [race, setRace] = useState(character.race);
  const [charClass, setClass] = useState(character.class);
  const [background, setBackground] = useState(character.background);
  const [alignment, setAlignment] = useState(character.alignment);

  
  useEffect(() => {
    // Initiate modal
    const modalError = document.querySelector(".alert-modal-background").querySelector("#alertModal");
    setModalAlert(new Modal(modalError));
  }, []);

  // Reset the local variable when starting to edit
  useEffect(() => {
    if (isEditing) {
      setName(character.name)
      setRace(character.race);
      setClass(character.class);
      setBackground(character.background);
      setAlignment(character.alignment);
    }
  }, [isEditing])

  const onClickUpdateCharacter = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    character.name = name;
    character.race = race;
    character.class = charClass;
    character.background = background;
    character.alignment = alignment;

    const didUpdate = await updateCharacter(character, SECTION_TITLE_NAME.BACKGROUND, updateCharMutation, setAlertTitle, modalAlert, toggleEditing);

    // Only update the UI if the database was updated
    if (didUpdate) {
      dispatch({
        type: CHARACTER_ACTIONS.EDIT,
        updatedCharacter: character
      });
    }
  }

  const renderEditing = () => {
    return (
      <div className="d-flex flex-column">
        <form className="d-flex flex-column" onSubmit={onClickUpdateCharacter}>
          <input className="edit-input title" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="edit-input title" value={race} onChange={(e) => setRace(e.target.value)} />
          <input className="edit-input title" value={charClass} onChange={(e) => setClass(e.target.value)} />
          <input className="edit-input title" value={background} onChange={(e) => setBackground(e.target.value)} />
          <input className="edit-input title" value={alignment} onChange={(e) => setAlignment(e.target.value)} />

          <button type="submit" className="btn fs-3 button-update">Update {SECTION_TITLE_NAME.BACKGROUND}</button>

          <hr />
        </form>
      </div>
    )
  }

  const renderViewing = () => {
    return (
      <>
        <h1>{character.name}</h1>
        <p>{character.race}</p>
        <p>{capitalizeFirst(character.class)}</p>
        <p>{character.background}</p>
        <p>{character.alignment}</p>
      </>
    )
  }

  return (
    <>
      {isEditing ?
        renderEditing() :
        renderViewing()
      }

      <div className="alert-modal-background">
        <Alert title={alertTitle} />
      </div>
    </>
  )
}

Background.propTypes = {
  char: PropTypes.object,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}