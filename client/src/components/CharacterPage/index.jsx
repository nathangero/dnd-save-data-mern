import "./style.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Character } from "../../models/Character";
import ROUTES from "../../utils/routes";
import CharacterInfo from "./charInfo";
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
import Background from "./background";

export default function CharacterPage() {

  const { characters } = useSelector(state => state.user);
  const { characterId } = useParams();

  const character = new Character(characters[characterId])

  // const scrollToSection = (sectionId) => {
  //   this.isShowingJumpToMenu = false; // Close the jump-to menu after clicking a link
  //   const sectionElement = document.getElementsByClassName(sectionId);
  //   if (sectionElement) {
  //     const sectionTop = sectionElement.getBoundingClientRect().top;
  //     const adjustedScrollTop = sectionTop + window.scrollY - 80;
  //     window.scrollTo({ top: adjustedScrollTop, behavior: 'smooth' });
  //   }
  // }

  return (
    <div className="character-page">
      <Link
        to={ROUTES.CHARACTERS}
        className="btn btn-secondary rounded-0"
      >
        Back to Characters
      </Link>

      <div id="character-view-background">
        <Background character={character} />
      </div>

      <div className="character-view-base text-center w-75">
        <CharacterInfo character={character} />
        <hr />
      </div>


      <div className="character-view-scores text-center w-75">
        <AbilityScores character={character} />
        <hr />
      </div>

      <div className="character-view-saving-throws text-center w-75">
        <SavingThrows character={character} />
        <hr />
      </div>

      <div className="character-view-skills text-center w-75">
        <Skills character={character} />
        <hr />
      </div>

      <div className="character-view-feature-traits text-center w-75">
        <FeaturesTraits character={character} />
        <hr />
      </div>

      <div className="character-view-weapons text-center w-75">
        <Weapons character={character} />
        <hr />
      </div>

      <div className="character-view-spell-slots text-center w-75">
        <SpellSlots character={character} />
        <hr />
      </div>

      <div className="character-view-spells text-center w-75">
        <Spells character={character}/>
        <hr />
      </div>

      <div className="character-view-proficiencies text-center w-75">
        <Proficiencies character={character} />
        <hr />
      </div>

      <div className="character-view-equipment text-center w-75">
        <Equipment character={character} />
        <hr />
      </div>

      <div className="character-view-languages text-center w-75">
        <Languages character={character} />
        <hr />
      </div>

      <div className="character-view-treasures text-center w-75">
        <Treasures character={character} />
        <hr />
      </div>

      <div className="backup-character">

      </div>

    </div>
  )
}