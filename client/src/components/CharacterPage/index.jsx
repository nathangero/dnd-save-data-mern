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
        <CharacterInfo
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.CHARACTER_INFO)}
          isShowingInfo={isShowingInfo}
        />
        <hr />
      </section>

      <section className="character-view text-center">
        <AbilityScores
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.ABILITY_SCORES)}
          isShowingScores={isShowingScores}
        />
        <hr />
      </section>

      <section className="character-view text-center">
        <SavingThrows
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.SAVING_THROWS)}
          isShowingSavingThrows={isShowingSavingThrows}
        />
        <hr />
      </section>

      <section className="character-view text-center">
        <Skills
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.SKILLS)}
          isShowingSkills={isShowingSkills}
        />
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
        <Weapons
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.WEAPONS)}
          isShowingWeapons={isShowingWeapons}
        />
        <hr />
      </section>

      <section className="character-view text-center">
        <SpellSlots
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.SPELL_SLOTS)}
          isShowingSpellSlots={isShowingSpellSlots}
        />
        <hr />
      </section>

      <section className="character-view text-center">
        <Spells
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.SPELLS)}
          isShowingSpells={isShowingSpells}
        />
        <hr />
      </section>

      <section className="character-view text-center">
        <Proficiencies
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.PROFICIENCIES)}
          isShowingProficiencies={isShowingProficiencies}
        />
        <hr />
      </section>

      <section className="character-view text-center">
        <Equipment
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.EQUIPMENT)}
          isShowingEquipment={isShowingEquipment}
        />
        <hr />
      </section>

      <section className="character-view text-center">
        <Languages
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.LANGUAGES)}
          isShowingLanguages={isShowingLanguages}
        />
        <hr />
      </section>

      <section className="character-view text-center">
        <Treasures
          character={character}
          toggleSectionShowing={() => toggleSectionShowing(SECTION_TITLE.TREASURES)}
          isShowingTreasures={isShowingTreasures}
        />
        <hr />
      </section>

      <div className="backup-character mb-5">
        <button>backup character</button>
      </div>

    </div >
  )
}