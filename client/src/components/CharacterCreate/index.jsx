import "./style.css";
import { Link } from "react-router-dom";
import ROUTES from "../../utils/routes";
import { SECTION_TITLE } from "../../utils/enums";
import CharacterSheet from "../CharacterSheet";

export default function CharacterCreate() {

  /**
   * Scroll to the appropriate section title.
   * @param {String} sectionId The div id
   */
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const sectionTop = sectionElement.getBoundingClientRect().top;
      const adjustedScrollTop = sectionTop + window.scrollY - 100;
      window.scrollTo({ top: adjustedScrollTop, behavior: 'smooth' });
    }
  }

  return (
    <div className="character-create">
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

      <CharacterSheet />
    </div>
  )
}