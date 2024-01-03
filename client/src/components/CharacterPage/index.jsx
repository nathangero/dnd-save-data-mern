import { Character } from "../../models/Character";

import "./style.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ROUTES from "../../utils/routes";

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
        <h1>{character.name}</h1>
        <p>{character.race}</p>
        <p>{character.class}</p>
        <p>{character.background}</p>
        <p>{character.alignment}</p>
      </div>

      <div className="character-view-base text-center w-75">
        <div className="d-flex">
          <h2 className="center-h2" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-base" aria-expanded="false" aria-controls="character-view-base">
            Character Info
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <div id="character-view-base" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="character-view-scores text-center w-75">
        <div className="d-flex">
          <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-scores" aria-expanded="false" aria-controls="character-view-scores">
            Ability Scores
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <div id="character-view-scores" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="character-view-saving-throws text-center w-75">
        <div className="d-flex">
          <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-saving-throws" aria-expanded="false" aria-controls="character-view-saving-throws">
            Saving Throws
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>
        </div>

        <div id="character-view-saving-throws" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="character-view-skills text-center w-75">
        <div className="d-flex">
          <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-skills" aria-expanded="false" aria-controls="character-view-skills">
            Skills
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>

        </div>

        <div id="character-view-skills" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="character-view-feature-traits text-center w-75">
        <div className="d-flex">
          <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-feature-traits" aria-expanded="false" aria-controls="character-view-base">
            Features & Traits
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>

        </div>

        <div id="character-view-feature-traits" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="character-view-weapons text-center w-75">
        <div className="d-flex">
          <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-weapons" aria-expanded="false" aria-controls="character-view-weapons">
            Weapons
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>

        </div>

        <div id="character-view-weapons" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="character-view-spell-slots text-center w-75">
        <div className="d-flex">
          <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-spell-slots" aria-expanded="false" aria-controls="character-view-spell-slots">
            Spell Slots
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>

        </div>

        <div id="character-view-spell-slots" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="character-view-spells text-center w-75">
        <div className="d-flex">
          <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-spells" aria-expanded="false" aria-controls="character-view-spells">
            Spells
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>

        </div>

        <div id="character-view-spells" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="character-view-proficiencies text-center w-75">
        <div className="d-flex">
          <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-proficiencies" aria-expanded="false" aria-controls="character-view-proficiencies">
            Proficiencies
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>

        </div>

        <div id="character-view-proficiencies" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="character-view-equipment text-center w-75">
        <div className="d-flex">
          <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-equipment" aria-expanded="false" aria-controls="character-view-equipment">
            Equipment
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>

        </div>

        <div id="character-view-equipment" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="character-view-languages text-center w-75">
        <div className="d-flex">
          <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-languages" aria-expanded="false" aria-controls="character-view-languages">
            Languages
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>

        </div>

        <div id="character-view-languages" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="character-view-treasures text-center w-75">
        <div className="d-flex">
          <h2 className="" type="button" data-bs-toggle="collapse" data-bs-target="#character-view-treasures" aria-expanded="false" aria-controls="character-view-treasures">
            Treasures
          </h2>
          <button className="btn btn-secondary button-edit">Edit</button>

        </div>

        <div id="character-view-treasures" className="collapse show">
          <div className="card card-body">
            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
          </div>
        </div>

        <hr />
      </div>

      <div className="backup-character">

      </div>

    </div>
  )
}