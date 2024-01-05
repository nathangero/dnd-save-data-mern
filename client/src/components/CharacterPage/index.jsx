import "./style.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Collapse } from "bootstrap/dist/js/bootstrap.min.js";
import { Character } from "../../models/Character";
import ROUTES from "../../utils/routes";
import Background from "./Background";
import CharacterInfo from "./CharacterInfo";
import AbilityScores from "./scores";
import Weapons from "./weapons";
import Treasures from "./treasures";
import SpellSlots from "./spellSlots";
import Spells from "./spells";
import Skills from "./skills";
import SavingThrows from "./savingThrows";
import Proficiencies from "./proficiencies";
import Languages from "./languages";
import FeaturesTraits from "./featuresTraits";
import Equipment from "./equipment";
import { useEffect, useState } from "react";

const SECTION_TITLE = {
  BACKGROUND: "character-view-background",
  CHARACTER_INFO: "character-view-info",
  ABILITY_SCORES: "character-view-scores",
  SAVING_THROWS: "character-view-saving-throws",
  SKILLS: "character-view-skills",
  FEATURES_TRAITS: "character-view-features-traits",
  WEAPONS: "character-view-weapons",
  SPELL_SLOTS: "character-view-spell-slots",
  SPELLS: "character-view-spells",
  PROFICIENCIES: "character-view-proficiencies",
  EQUIPMENT: "character-view-equipment",
  LANGUAGES: "character-view-languages",
  TREASURES: "character-view-treasures",
  BACKUP: "backup-character",
}

export default function CharacterPage() {

  const { characters } = useSelector(state => state.user);
  const { characterId } = useParams();

  const [jumpToMenu, setJumpToMenu] = useState(null);
  const [isShowingInfo, showInfo] = useState(true);
  const [isShowingScores, showScores] = useState(true);

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
    console.log("@toggleSectionShowing");
    switch (sectionId) {
      case SECTION_TITLE.CHARACTER_INFO:
        console.log("@CHARACTER_INFO");
        showInfo(!isShowingInfo);
        break;

      case SECTION_TITLE.ABILITY_SCORES:
        console.log("@ABILITY_SCORES");
        showScores(!isShowingScores);
        break;

      default:
        console.log("at default");
        break;
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
              <ul className="list-unstyled fs-4 mb-0" role="button">
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

      <section id="character-view-background" className="text-center fs-4">
        <Background character={character} />
      </section>

      <section className="character-view text-center px-2">
        <div className="d-flex justify-content-between" onClick={() => toggleSectionShowing(SECTION_TITLE.CHARACTER_INFO)} data-bs-toggle="collapse" data-bs-target="#character-view-info" aria-expanded="false" aria-controls="character-view-info">
          <div className="d-flex">
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
        <div className="d-flex justify-content-center">
          <h2 className="section-title" type="button" onClick={() => toggleSectionShowing(SECTION_TITLE.ABILITY_SCORES)} data-bs-toggle="collapse" data-bs-target="#character-view-scores" aria-expanded="false" aria-controls="character-view-scores">
            Ability Scores
          </h2>

          <button className="btn button-chevron" onClick={() => toggleSectionShowing(SECTION_TITLE.ABILITY_SCORES)} data-bs-toggle="collapse" data-bs-target="#character-view-scores" aria-expanded="false" aria-controls="character-view-scores">
            {isShowingScores ?
              <i className="bi bi-chevron-down" aria-label="chevron-down"></i> :
              <i className="bi bi-chevron-up" aria-label="chevron-up"></i>
            }
          </button>

          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <section id="character-view-scores" className="collapse show fs-3 m-auto">
          <AbilityScores character={character} />
        </section>
        <hr />
      </section>

      <section className="character-view text-center">
        <SavingThrows character={character} />
        <hr />
      </section>

      <section className="character-view text-center">
        <Skills character={character} />
        <hr />
      </section>

      <section className="character-view text-center">
        <FeaturesTraits character={character} />
        <hr />
      </section>

      <section className="character-view text-center">
        <Weapons character={character} />
        <hr />
      </section>

      <section className="character-view text-center">
        <SpellSlots character={character} />
        <hr />
      </section>

      <section className="character-view text-center">
        <Spells character={character} />
        <hr />
      </section>

      <section className="character-view text-center">
        <Proficiencies character={character} />
        <hr />
      </section>

      <section className="character-view text-center">
        <Equipment character={character} />
        <hr />
      </section>

      <section className="character-view text-center">
        <Languages character={character} />
        <hr />
      </section>

      <section className="character-view text-center">
        <Treasures character={character} />
        <hr />
      </section>

      <div className="backup-character">

      </div>

    </div>
  )
}