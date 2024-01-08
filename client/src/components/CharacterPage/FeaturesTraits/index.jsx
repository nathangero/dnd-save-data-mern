import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";
import { useEffect, useState } from "react";

export default function FeaturesTraits(props) {
  const character = new Character(props.character);

  const [jumpToMenu, setMenu] = useState({});
  useEffect(() => {
    // Make jump to menu
    character.featureTraits?.map(feat => {
      const id = makeIdFromName(feat.name);
      const copy = jumpToMenu; // Make a copy of the current list
      copy[feat.name] = id; // Add the new name with its div id
      setMenu(copy); // Save it
    })
  }, [])

  /**
   * Creates a div id from the feature/trait name
   * @param {String} name Feature/Trait name
   * @returns A string of the name lowercased and spaces replacecd with dashes 
   */
  const makeIdFromName = (name) => {
    const id = name.toLowerCase().split(" ").join("-");
    return id;
  }

  const scrollTo = (id) => {
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      const sectionTop = sectionElement.getBoundingClientRect().top;
      const adjustedScrollTop = sectionTop + window.scrollY - 105;
      window.scrollTo({ top: adjustedScrollTop, behavior: 'smooth' });
    }
  }

  return (
    <>
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex " role="button" onClick={() => props.toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target="#character-view-features-traits" aria-expanded="false" aria-controls="character-view-features-traits">
          <h2 className="section-title">
            Features & Traits
          </h2>
          {props.isShowingFeatureTraits ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <div className="d-flex">
          <div className="dropdown">
            <button className="btn dropdown-toggle button-menu-jump me-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Jump to
            </button>
            <ul className="dropdown-menu">
              {Object.keys(jumpToMenu).map((key, index) => (
                <li key={index} className="btn dropdown-item" onClick={() => scrollTo(jumpToMenu[key])}>{key}</li>
              ))}
            </ul>
          </div>

          <button className="btn button-edit">Edit</button>
        </div>
      </div>

      <div id="character-view-features-traits">
        {character.featureTraits?.map((feat, index) => (
          <div key={index} id={makeIdFromName(feat.name)}>
            <h3><u>{feat.name}</u></h3>
            <div className="stat-row">
              <p>Uses</p>
              <b>{feat.uses}</b>
            </div>
            <div className="stat-row">
              <p>Trait Type</p>
              <b>{feat.traitType}</b>
            </div>
            <div className="stat-row">
              <p>Action Type</p>
              <b>{feat.actionType}</b>
            </div>
            <p className="description">{feat.description}</p>

            <hr />
          </div>
        ))}
      </div>

    </>
  )
}

FeaturesTraits.propTypes = {
  character: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingFeatureTraits: PropTypes.bool,
}