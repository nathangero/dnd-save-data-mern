// import "./style.css";
import PropTypes from "prop-types";
import Alert from "../../Alert";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Modal } from "bootstrap/dist/js/bootstrap.min.js";
import { ALIGNMENTS, ALIGNMENT_NAMES, ALIGNMENT_NAMES_TO_KEY, CHARACTER_CLASSES, SECTION_TITLE_NAME } from "../../../utils/enums";
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
  const [customClass, setCustomClass] = useState("");
  const [background, setBackground] = useState(character.background);
  const [alignment, setAlignment] = useState(character.alignment);
  const [customAlignment, setCustomAlignment] = useState("");


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


  const onChangeClass = ({ target }) => {
    // If the class isn't custom, delete the custom class
    if (target.value !== CHARACTER_CLASSES.CUSTOM) {
      setCustomClass("");
    }

    setClass(target.value);
  }

  const onChangeAlignment = ({ target }) => {
    console.log("@onChangeAlignment");
    console.log("value:", target.value);
    console.log("actual key:", ALIGNMENT_NAMES_TO_KEY[target.value]);
    // If the class isn't custom, delete the custom class
    if (target.value !== ALIGNMENTS.CUSTOM) {
      setCustomAlignment("");
    }

    setAlignment(ALIGNMENT_NAMES_TO_KEY[target.value]);
  }

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
      <form className="" onSubmit={onClickUpdateCharacter}>
        <div className="stat-row">
          <p>Name</p>
          <input className="edit-input w-50" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="stat-row">
          <p>Race</p>
          <input className="edit-input w-50" value={race} onChange={(e) => setRace(e.target.value)} />
        </div>

        <div className="stat-row">
          <p>Class</p>
          <select value={capitalizeFirst(charClass)} onChange={onChangeClass}>
            {Object.values(CHARACTER_CLASSES).map((type, index) => (
              <option key={index} className="text-center">{capitalizeFirst(type)}</option>
            ))}
          </select>
        </div>

        {charClass === capitalizeFirst(CHARACTER_CLASSES.CUSTOM) ?
          <div className="stat-row">
            <p>Custom Class</p>
            <input className="edit-input w-50" value={customClass} onChange={(e) => setCustomClass(e.target.value)} />
          </div> : null
        }

        <div className="stat-row">
          <p>Background</p>
          <input className="edit-input w-50" value={background} onChange={(e) => setBackground(e.target.value)} />
        </div>

        <div className="stat-row">
          <p>Alignment</p>
          <select value={ALIGNMENT_NAMES[alignment]} onChange={onChangeAlignment}>
            {Object.values(ALIGNMENTS).map((type, index) => (
              <option key={index} className="text-center">{ALIGNMENT_NAMES[type]}</option>
            ))}
          </select>
        </div>

        {alignment === ALIGNMENTS.CUSTOM ?
          <div className="stat-row">
            <p>Custom Alignment</p>
            <input className="edit-input w-50" value={customAlignment} onChange={(e) => setCustomAlignment(e.target.value)} />
          </div> : null
        }

        <button type="submit" className="btn fs-3 button-update">Update {SECTION_TITLE_NAME.BACKGROUND}</button>

        <hr />
      </form>
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