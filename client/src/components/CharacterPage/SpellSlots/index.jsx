import "./style.css";
import PropTypes from "prop-types";
import Alert from "../../Alert";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { CHARACTER_VIEW_ID, SPELL_NAMES } from "../../../utils/enums";

export default function SpellSlots({ char, toggleSectionShowing, isShowingSpellSlots, toggleEditing, isEditing }) {
  const character = { ...char }

  /**
   * Creates a div id from the spell name
   * @param {String} name Feature/Trait name
   * @returns A string of the name lowercased and spaces replacecd with dashes 
   */
  const makeIdFromSpellSlot = (name) => {
    const id = `spell-slot-${name.toLowerCase().split("_").join("-")}`;
    return id;
  }


  const renderEditing = () => {

    return (
      <>

      </>
    )
  }


  const renderViewing = () => {

    return (
      <>

      </>
    )
  }

  return (
    <div className="fs-3">
      <div className="character-view-header sticky-top pt-1">
        <div className="d-flex" role="button" onClick={() => toggleSectionShowing()} data-bs-toggle="collapse" data-bs-target={`#${CHARACTER_VIEW_ID.SPELL_SLOTS}`} aria-expanded="false" aria-controls={CHARACTER_VIEW_ID.SPELL_SLOTS}>
          <h2 className="section-title">
            Spell Slots
          </h2>
          {isShowingSpellSlots ?
            <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
            <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
          }
        </div>

        <button className="btn btn-secondary button-edit" onClick={() => toggleEditing()}>{isEditing ? "Finish" : "Edit"}</button>
      </div>

      <div id={CHARACTER_VIEW_ID.SPELL_SLOTS} className="collapse show">
        {Object.keys(character.spellSlots)?.map((item, index) => (
          <React.Fragment key={index}>
            {!SPELL_NAMES[item] ? null : // Ignore _typename and _id
              <div id={makeIdFromSpellSlot(item)} className="d-flex justify-content-between">
                {!character.spellSlots[item] ? null :
                  <>
                    <p>{SPELL_NAMES[item]}</p>
                    <b>{character.spellSlots[item].current}/{character.spellSlots[item].max}</b>
                  </>
                }
              </div>
            }
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

SpellSlots.propTypes = {
  char: PropTypes.object,
  toggleSectionShowing: PropTypes.func,
  isShowingSpellSlots: PropTypes.bool,
  toggleEditing: PropTypes.func,
  isEditing: PropTypes.bool,
}