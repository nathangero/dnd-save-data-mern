import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { useEffect, useState } from "react";
import { makeIdFromName, makeJumpToForSection, scrollToListItem } from "../../../utils/shared-functions";

export default function Treasures(props) {
  const character = new Character(props.character);

  const [jumpToMenu, setMenu] = useState({});

  useEffect(() => {
    // Make jump to menu
    setMenu(makeJumpToForSection(character.treasures));
  }, [])

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => props.toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-treasures" aria-expanded="false" aria-controls="character-view-treasures">
          <h2 className="section-title treasures">
            Treasures
          </h2>
          {props.isShowingTreasures ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="d-flex align-items-baseline">
          <div className="dropdown">
            <button className="btn dropdown-toggle button-menu-jump me-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Jump to
            </button>
            <ul className="dropdown-menu">
              {Object.keys(jumpToMenu).map((key, index) => (
                <li key={index} className="btn dropdown-item" onClick={() => scrollToListItem(jumpToMenu[key], document, window)}>{key}</li>
              ))}
            </ul>
          </div>

          <button className="btn button-edit">Edit</button>
        </div>
      </div>

      <div id="character-view-treasures" className="collapse show">
        {character.treasures?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <h3><u>{item.name} x{item.amount}</u></h3>
            <p className="description">{item.description}</p>

            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

Treasures.propTypes = {
  character: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingTreasures: PropTypes.bool,
}