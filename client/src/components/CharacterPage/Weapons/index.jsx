import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { useEffect, useState } from "react";
import { calcScoreMod, calcScoreWithProficiency, getScoreName, makeIdFromName, makeJumpToForSection, scrollToListItem } from "../../../utils/shared-functions";

export default function Weapons(props) {
  const character = new Character(props.character);

  const [jumpToMenu, setMenu] = useState({});

  useEffect(() => {
    // Make jump to menu
    setMenu(makeJumpToForSection(character.weapons));
  }, [])

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => props.toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-weapons" aria-expanded="false" aria-controls="character-view-weapons">
          <h2 className="section-title weapons">
            Weapons
          </h2>
          {props.isShowingWeapons ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="dropdown">
          <div className={props.isShowingWeapons ? "d-flex align-items-baseline" : "d-flex flex-row-reverse align-items-baseline"}>
            <button
              className={props.isShowingWeapons ? "btn dropdown-toggle button-menu-jump me-3" : "btn dropdown-toggle button-menu-jump me-3 hide-dropdown"}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Jump to
            </button>
            <button className="btn button-edit">Edit</button>

            <ul className="dropdown-menu">
              {Object.keys(jumpToMenu).map((key, index) => (
                <li key={index} className="btn dropdown-item" onClick={() => scrollToListItem(jumpToMenu[key], document, window)}>{key}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div id="character-view-weapons" className="collapse show">
        {character.weapons?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <h3><u>{item.name} x{item.amount}</u></h3>
            <div className="stat-row">
              <p>Attack Mod</p>
              <b>{calcScoreWithProficiency(character.scores[item.attackDamageStat], character.level, item.proficient, true)} ({getScoreName(item.attackDamageStat)})</b>
            </div>
            <div className="stat-row">
              <p>Damage Mod</p>
              <b>{calcScoreMod(character.scores[item.attackDamageStat], true)} ({getScoreName(item.attackDamageStat)})</b>
            </div>
            <div className="stat-row">
              <p>Die Type</p>
              <b>{item.dieType}</b>
            </div>
            <div className="stat-row">
              <p>Category</p>
              <b>{item.category}</b>
            </div>
            <div className="stat-row">
              <p>Proficient?</p>
              <b>{item.proficient ? "Yes" : "No"}</b>
            </div>
            <p className="description">{item.description}</p>

            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

Weapons.propTypes = {
  character: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingWeapons: PropTypes.bool,
}