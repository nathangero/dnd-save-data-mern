import "./style.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ROUTES from "../../utils/routes";
import Background from "./Background";
import CharacterInfo from "./CharacterInfo";
import AbilityScores from "./AbilityScores";
import Weapons from "./Weapons";
import Treasures from "./Treasures";
import SpellSlots from "./SpellSlots";
import Spells from "./Spells";
import Skills from "./Skills";
import SavingThrows from "./SavingThrows";
import Proficiencies from "./Proficiencies";
import Languages from "./Languages";
import FeaturesTraits from "./FeaturesTraits";
import Equipment from "./Equipment";
import { useState } from "react";
import { SECTION_TITLE } from "../../utils/enums";

export default function CharacterPage() {

  const { characters } = useSelector(state => state.user);
  const { characterId } = useParams();

  const [isShowingInfo, showInfo] = useState(true);
  const [isShowingScores, showScores] = useState(true);
  const [isShowingSavingThrows, showSavingThrows] = useState(true);
  const [isShowingSkills, showSkills] = useState(true);
  const [isShowingFeatureTraits, showFeatureTraits] = useState(true);
  const [isShowingWeapons, showWeapons] = useState(true);
  const [isShowingSpellSlots, showSpellSlots] = useState(true);
  const [isShowingSpells, showSpells] = useState(true);
  const [isShowingProficiencies, showProficiencies] = useState(true);
  const [isShowingEquipment, showEquipment] = useState(true);
  const [isShowingLanguages, showLanguages] = useState(true);
  const [isShowingTreasures, showTreasures] = useState(true);

  const [isEditingInfo, editInfo] = useState(false);
  const [isEditingScores, editScores] = useState(false);
  const [isEditingSavingThrows, editSavingThrows] = useState(false);
  const [isEditingSkills, editSkills] = useState(false);
  const [isEditingFeatureTraits, editFeatureTraits] = useState(false);
  const [isEditingWeapons, editWeapons] = useState(false);
  const [isEditingSpellSlots, editSpellSlots] = useState(false);
  const [isEditingSpells, editSpells] = useState(false);
  const [isEditingProficiencies, editProficiencies] = useState(false);
  const [isEditingEquipment, editEquipment] = useState(false);
  const [isEditingLanguages, editLanguages] = useState(false);
  const [isEditingTreasures, editTreasures] = useState(false);

  /**
   * Scroll to the appropriate section title.
   * @param {String} sectionId The div id
   */
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const sectionTop = sectionElement.getBoundingClientRect().top;
      const adjustedScrollTop = sectionTop + window.scrollY - 50;
      window.scrollTo({ top: adjustedScrollTop, behavior: 'smooth' });
    }
  }

  const toggleSectionShowing = (sectionId) => {
    switch (sectionId) {
      case SECTION_TITLE.CHARACTER_INFO:
        showInfo(!isShowingInfo);
        break;

      case SECTION_TITLE.ABILITY_SCORES:
        showScores(!isShowingScores);
        break;

      case SECTION_TITLE.SAVING_THROWS:
        showSavingThrows(!isShowingSavingThrows);
        break;

      case SECTION_TITLE.SKILLS:
        showSkills(!isShowingSkills);
        break;

      case SECTION_TITLE.FEATURES_TRAITS:
        showFeatureTraits(!isShowingFeatureTraits);
        break;

      case SECTION_TITLE.WEAPONS:
        showWeapons(!isShowingWeapons);
        break;

      case SECTION_TITLE.SPELL_SLOTS:
        showSpellSlots(!isShowingSpellSlots);
        break;

      case SECTION_TITLE.SPELLS:
        showSpells(!isShowingSpells);
        break;

      case SECTION_TITLE.PROFICIENCIES:
        showProficiencies(!isShowingProficiencies);
        break;

      case SECTION_TITLE.EQUIPMENT:
        showEquipment(!isShowingEquipment);
        break;

      case SECTION_TITLE.LANGUAGES:
        showLanguages(!isShowingLanguages);
        break;

      case SECTION_TITLE.TREASURES:
        showTreasures(!isShowingTreasures);
        break;

      default:
      // console.log("at default");
    }
  }

  return (
    <div className="character-page">
      <nav className="sticky-top w-100">
        <div className="py-2 menu-bar">
          <div>
            <Link
              to={ROUTES.CHARACTERS}
              className="btn button-go-back"
            >
              <i className="bi bi-chevron-left"></i> Characters
            </Link>
          </div>

          <div className="dropdown-center">
            <button
              className="btn dropdown-toggle button-menu-jump ms-3"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Jump to Section
            </button>

            <ul className="dropdown-menu menu-proper py-0 fs-5">
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.BACKGROUND)}>Background</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.CHARACTER_INFO)}>Character Info</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.ABILITY_SCORES)}>Ability Scores</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.SAVING_THROWS)}>Saving Throws</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.SKILLS)}>Skills</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.FEATURES_TRAITS)}>Features & Traits</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.WEAPONS)}>Weapons</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.SPELL_SLOTS)}>Spell Slots</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.SPELLS)}>Spells</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.PROFICIENCIES)}>Proficiencies</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.EQUIPMENT)}>Equipment</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.LANGUAGES)}>Languages</li>
              <li className="dropdown-item" onClick={() => scrollToSection(SECTION_TITLE.TREASURES)}>Treasures</li>
            </ul>
          </div>
        </div>
      </nav>

      <section id={SECTION_TITLE.BACKGROUND} className="text-center fs-4 mt-3">
        <Background
          char={characters[characterId]}
          toggleEditing={() => editInfo(!isEditingInfo)}
          isEditing={isEditingInfo}
        />
      </section>

      <section id={SECTION_TITLE.CHARACTER_INFO} className="character-view text-center">
        <CharacterInfo
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.CHARACTER_INFO)}
          isShowingInfo={isShowingInfo}
          toggleEditing={() => editInfo(!isEditingInfo)}
          isEditing={isEditingInfo}
        />
        <hr />
      </section>

      <section id={SECTION_TITLE.ABILITY_SCORES} className="character-view text-center">
        <AbilityScores
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.ABILITY_SCORES)}
          isShowingScores={isShowingScores}
          toggleEditing={() => editScores(!isEditingScores)}
          isEditing={isEditingScores}
        />
        <hr />
      </section>

      <section id={SECTION_TITLE.SAVING_THROWS} className="character-view text-center">
        <SavingThrows
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.SAVING_THROWS)}
          isShowingSavingThrows={isShowingSavingThrows}
          toggleEditing={() => editSavingThrows(!isEditingSavingThrows)}
          isEditing={isEditingSavingThrows}
        />
        <hr />
      </section>

      <section id={SECTION_TITLE.SKILLS} className="character-view text-center">
        <Skills
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.SKILLS)}
          isShowingSkills={isShowingSkills}
          toggleEditing={() => editSkills(!isEditingSkills)}
          isEditing={isEditingSkills}
        />
        <hr />
      </section>

      <section id={SECTION_TITLE.FEATURES_TRAITS} className="character-view text-center">
        <FeaturesTraits
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.FEATURES_TRAITS)}
          isShowingFeatureTraits={isShowingFeatureTraits}
          toggleEditing={() => editFeatureTraits(!isEditingFeatureTraits)}
          isEditing={isEditingFeatureTraits}
        />
        <hr />
      </section>

      <section id={SECTION_TITLE.WEAPONS} className="character-view text-center">
        <Weapons
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.WEAPONS)}
          isShowingWeapons={isShowingWeapons}
          toggleEditing={() => editWeapons(!isEditingWeapons)}
          isEditing={isEditingWeapons}
        />
        <hr />
      </section>

      <section id={SECTION_TITLE.SPELL_SLOTS} className="character-view text-center">
        <SpellSlots
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.SPELL_SLOTS)}
          isShowingSpellSlots={isShowingSpellSlots}
          toggleEditing={() => editSpellSlots(!isEditingSpellSlots)}
          isEditing={isEditingSpellSlots}
        />
        <hr />
      </section>

      <section id={SECTION_TITLE.SPELLS} className="character-view text-center">
        <Spells
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.SPELLS)}
          isShowingSpells={isShowingSpells}
          toggleEditing={() => editSpells(!isEditingSpells)}
          isEditing={isEditingSpells}
        />
        <hr />
      </section>

      <section id={SECTION_TITLE.PROFICIENCIES} className="character-view text-center">
        <Proficiencies
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.PROFICIENCIES)}
          isShowingProficiencies={isShowingProficiencies}
          toggleEditing={() => editProficiencies(!isEditingProficiencies)}
          isEditing={isEditingProficiencies}
        />
        <hr />
      </section>

      <section id={SECTION_TITLE.EQUIPMENT} className="character-view text-center">
        <Equipment
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.EQUIPMENT)}
          isShowingEquipment={isShowingEquipment}
          toggleEditing={() => editEquipment(!isEditingEquipment)}
          isEditing={isEditingEquipment}
        />
        <hr />
      </section>

      <section id={SECTION_TITLE.LANGUAGES} className="character-view text-center">
        <Languages
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.LANGUAGES)}
          isShowingLanguages={isShowingLanguages}
          toggleEditing={() => editLanguages(!isEditingLanguages)}
          isEditing={isEditingLanguages}
        />
        <hr />
      </section>

      <section id={SECTION_TITLE.TREASURES} className="character-view text-center">
        <Treasures
          char={characters[characterId]}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.TREASURES)}
          isShowingTreasures={isShowingTreasures}
          toggleEditing={() => editTreasures(!isEditingTreasures)}
          isEditing={isEditingTreasures}
        />
        <hr />
      </section>

      <div className="backup-character mb-5">
        <button>backup character</button>
      </div>

    </div >
  )
}