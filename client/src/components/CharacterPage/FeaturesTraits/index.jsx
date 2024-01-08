import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { useEffect, useState } from "react";
import { makeIdFromName, makeJumpToForSection, scrollToListItem } from "../../../utils/shared-functions";

export default function FeaturesTraits(props) {
  const character = new Character(props.character);

  const [jumpToMenu, setMenu] = useState({});

  useEffect(() => {
    // Make jump to menu
    setMenu(makeJumpToForSection(character.featureTraits));
  }, [])

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex " role="button" onClick={() => props.toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-features-traits" aria-expanded="false" aria-controls="character-view-features-traits">
          <h2 className="section-title feats">
            Features & Traits
          </h2>
          {props.isShowingFeatureTraits ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="dropdown">
          <div className={props.isShowingFeatureTraits ? "d-flex align-items-baseline" : "d-flex flex-row-reverse align-items-baseline"}>
            <button
              className={props.isShowingFeatureTraits ? "btn dropdown-toggle button-menu-jump me-3" : "btn dropdown-toggle button-menu-jump me-3 hide-dropdown"}
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

      <div id="character-view-features-traits" className="collapse show">
        {character.featureTraits?.map((item, index) => (
          <div key={index} id={makeIdFromName(item.name)}>
            <h3><u>{item.name}</u></h3>
            <div className="stat-row">
              <p>Uses</p>
              <b>{item.uses}</b>
            </div>
            <div className="stat-row">
              <p>Trait Type</p>
              <b>{item.traitType}</b>
            </div>
            <div className="stat-row">
              <p>Action Type</p>
              <b>{item.actionType}</b>
            </div>
            <p className="description">{item.description}</p>

            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

FeaturesTraits.propTypes = {
  character: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingFeatureTraits: PropTypes.bool,
}