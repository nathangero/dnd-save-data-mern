import "./style.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Collapse } from "bootstrap/dist/js/bootstrap.min.js";
import { Character } from "../../models/Character";
import ROUTES from "../../utils/routes";
import Background from "./Background";
import CharacterInfo from "./CharacterInfo";
import AbilityScores from "./AbilityScores";
import Weapons from "./weapons";
import Treasures from "./treasures";
import SpellSlots from "./spellSlots";
import Spells from "./spells";
import Skills from "./Skills";
import SavingThrows from "./SavingThrows";
import Proficiencies from "./proficiencies";
import Languages from "./languages";
import FeaturesTraits from "./FeaturesTraits";
import Equipment from "./equipment";
import { useEffect, useState } from "react";
import { SECTION_TITLE } from "../../utils/enums";

export default function CharacterPage() {

  const { characters } = useSelector(state => state.user);
  const { characterId } = useParams();

  const [jumpToMenu, setJumpToMenu] = useState(null);

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

  const character = new Character(characters[characterId]);

  useEffect(() => {
    // Initiate menu
    const jumpMenu = document.getElementById("menu-jump-to");
    setJumpToMenu(new Collapse(jumpMenu, { toggle: false })); // Keep menu closed upon creation
  }, [])

  /**
   * Scroll to the appropriate section title.
   * @param {String} sectionId The div id
   */
  const scrollToSection = (sectionId) => {
    jumpToMenu.hide(); // Close the jump-to menu after clicking a link
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const sectionTop = sectionElement.getBoundingClientRect().top;
      const adjustedScrollTop = sectionTop + window.scrollY - 100;
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
              className="btn btn-primary rounded"
            >
              <i className="bi bi-chevron-left"></i> Characters
            </Link>
          </div>

          <div className="">
            <button className="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#menu-jump-to" aria-expanded="false" aria-controls="menu-jump-to">Jump to</button>
          </div>
        </div>

        <div id="menu-jump-to" className="collapse">
          <div className="d-flex justify-content-end">
            <div className="menu-proper">
              <ul className="list-unstyled fs-4 " role="button">
                <li onClick={() => scrollToSection(SECTION_TITLE.BACKGROUND)}>Background</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.CHARACTER_INFO)}>Character Info</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.ABILITY_SCORES)}>Ability Scores</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.SAVING_THROWS)}>Saving Throws</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.SKILLS)}>Skills</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.FEATURES_TRAITS)}>Features & Traits</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.WEAPONS)}>Weapons</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.SPELL_SLOTS)}>Spell Slots</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.SPELLS)}>Spells</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.PROFICIENCIES)}>Proficiencies</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.EQUIPMENT)}>Equipment</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.LANGUAGES)}>Languages</li>
                <li onClick={() => scrollToSection(SECTION_TITLE.TREASURES)}>Treasures</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <section id="character-view-background" className="text-center fs-4 mt-3">
        <Background character={character} />
      </section>

      <section className="character-view text-center">
        <div className="character-view-header">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing(SECTION_TITLE.CHARACTER_INFO)} data-bs-toggle="collapse" data-bs-target="#character-view-info" aria-expanded="false" aria-controls="character-view-info">
            <h2 className="section-title">
              Character Info
            </h2>
            {isShowingInfo ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-info" className="collapse show fs-3">
          <CharacterInfo character={character} />
        </section>
        <hr />
      </section>

      <section className="character-view text-center">
        <div className="character-view-header">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing(SECTION_TITLE.ABILITY_SCORES)} data-bs-toggle="collapse" data-bs-target="#character-view-scores" aria-expanded="false" aria-controls="character-view-scores">
            <h2 className="section-title">
              Ability Scores
            </h2>
            {isShowingScores ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-scores" className="collapse show fs-3 m-auto">
          <AbilityScores character={character} />
        </section>
        <hr />
      </section>

      <section className="character-view text-center">
        <div className="character-view-header">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing(SECTION_TITLE.SAVING_THROWS)} data-bs-toggle="collapse" data-bs-target="#character-view-saving-throws" aria-expanded="false" aria-controls="character-view-saving-throws">
            <h2 className="section-title">
              Saving Throws
            </h2>
            {isShowingSavingThrows ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-saving-throws" className="collapse show fs-3">
          <SavingThrows character={character} />
        </section>
        <hr />
      </section>

      <section className="character-view text-center">
        <div className="character-view-header">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing(SECTION_TITLE.SKILLS)} data-bs-toggle="collapse" data-bs-target="#character-view-skills" aria-expanded="false" aria-controls="character-view-skills">
            <h2 className="section-title">
              Skills
            </h2>
            {isShowingSkills ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-skills" className="collapse show fs-3">
          <Skills character={character} />
        </section>
        <hr />
      </section>

      <section className="character-view text-center">
        <FeaturesTraits
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.FEATURES_TRAITS)}
          isShowingFeatureTraits={isShowingFeatureTraits}
        />
        <hr />
      </section>

      <section className="character-view text-center">
        <div className="character-view-header">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing(SECTION_TITLE.WEAPONS)} data-bs-toggle="collapse" data-bs-target="#character-view-weapons" aria-expanded="false" aria-controls="character-view-weapons">
            <h2 className="section-title">
              Weapons
            </h2>
            {isShowingWeapons ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-weapons" className="collapse show fs-3">
          <Weapons character={character} />
        </section>
        <hr />
      </section>

      <section className="character-view text-center">
        <div className="character-view-header">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing(SECTION_TITLE.SPELL_SLOTS)} data-bs-toggle="collapse" data-bs-target="#character-view-spell-slots" aria-expanded="false" aria-controls="character-view-spell-slots">
            <h2 className="section-title">
              Spell Slots
            </h2>
            {isShowingSpellSlots ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-spell-slots" className="collapse show fs-3">
          <SpellSlots character={character} />
        </section>
        <hr />
      </section>

      <section className="character-view text-center">
        <div className="character-view-header">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing(SECTION_TITLE.SPELLS)} data-bs-toggle="collapse" data-bs-target="#character-view-spells" aria-expanded="false" aria-controls="character-view-spells">
            <h2 className="section-title">
              Spells
            </h2>
            {isShowingSpells ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-spells" className="collapse show fs-3">
          <Spells character={character} />
        </section>
        <hr />
      </section>

      <section className="character-view text-center">
        <div className="character-view-header">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing(SECTION_TITLE.PROFICIENCIES)} data-bs-toggle="collapse" data-bs-target="#character-view-proficiencies" aria-expanded="false" aria-controls="character-view-proficiencies">
            <h2 className="section-title">
              Proficiencies
            </h2>
            {isShowingProficiencies ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-proficiencies" className="collapse show fs-3">
          <Proficiencies character={character} />
        </section>
        <hr />
      </section>

      <section className="character-view text-center">
        <div className="character-view-header">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing(SECTION_TITLE.EQUIPMENT)} data-bs-toggle="collapse" data-bs-target="#character-view-equipment" aria-expanded="false" aria-controls="character-view-equipment">
            <h2 className="section-title">
              Equipment
            </h2>
            {isShowingEquipment ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-equipment" className="collapse show fs-3">
          <Equipment character={character} />
        </section>
        <hr />
      </section>

      <section className="character-view text-center">
        <div className="character-view-header">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing(SECTION_TITLE.LANGUAGES)} data-bs-toggle="collapse" data-bs-target="#character-view-languages" aria-expanded="false" aria-controls="character-view-languages">
            <h2 className="section-title">
              Languages
            </h2>
            {isShowingLanguages ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-languages" className="collapse show fs-3">
          <Languages character={character} />
        </section>
        <hr />
      </section>

      <section className="character-view text-center">
        <div className="character-view-header">
          <div className="d-flex" role="button" onClick={() => toggleSectionShowing(SECTION_TITLE.TREASURES)} data-bs-toggle="collapse" data-bs-target="#character-view-treasures" aria-expanded="false" aria-controls="character-view-treasures">
            <h2 className="section-title">
              Treasures
            </h2>
            {isShowingTreasures ?
              <i className="bi bi-chevron-down fs-3 px-3" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up fs-3 px-3" aria-label="chevron-up"></i>
            }
          </div>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-treasures" className="collapse show fs-3">
          <Treasures character={character} />
        </section>
        <hr />
      </section>

      <div className="backup-character mb-5">
        <button>backup character</button>
      </div>

    </div>
  )
}