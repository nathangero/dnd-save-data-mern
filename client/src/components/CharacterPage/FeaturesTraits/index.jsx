import "./style.css";
import PropTypes from "prop-types";
import { Character } from "../../../models/Character";

export default function FeaturesTraits(props) {
  const character = new Character(props.character);

  /**
   * Creates a div id from the feature/trait name
   * @param {String} name Feature/Trait name
   * @returns A string of the name lowercased and spaces replacecd with dashes 
   */
  const makeIdFromName = (name) => {
    return name.toLowerCase().split(" ").join("-");
  }

  return (
    <>
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
          <p className="text-start">{feat.description}</p>
        </div>
      ))}
    </>
  )
}

FeaturesTraits.propTypes = {
  character: PropTypes.object
}