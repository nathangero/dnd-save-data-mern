import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { useEffect, useState } from "react";
import { makeIdFromName, makeJumpToForSection, scrollToListItem } from "../../../utils/shared-functions";
import { CHARACTER_VIEW_ID } from "../../../utils/enums";

export default function Proficiencies({ char, toggleSectionShowing, isShowingProficiencies, toggleEditing, isEditing }) {
  const character = { ...char }

  const [jumpToMenu, setMenu] = useState({});

  useEffect(() => {
    // Make jump to menu
    setMenu(makeJumpToForSection(character.proficiencies));
  }, [])

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.PROFICIENCIES}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.PROFICIENCIES}>
          <h2 className="section-title proficiencies">
            Proficiencies
          </h2>
          {isShowingProficiencies ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="dropdown">
          <div className="d-flex align-items-baseline justify-content-between w-100">
            <button className="btn button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>

            <button
              className={isShowingProficiencies ? "btn dropdown-toggle button-menu-jump ms-3" : "btn dropdown-toggle button-menu-jump ms-3 hide-dropdown"}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Jump to
            </button>

            <ul className="dropdown-menu">
              {Object.keys(jumpToMenu).map((key, index) => (
                <li key={index} className="btn dropdown-item" onClick={() => scrollToListItem(jumpToMenu[key], document, window)}>{key}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id={CHARACTER_VIEW_ID.PROFICIENCIES} className="collapse show">
        {character.proficiencies?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <h3><u>{item.name}</u></h3>
            <p className="description">{item.description}</p>

            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

Proficiencies.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingProficiencies: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}