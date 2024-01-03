import { Character } from "../../models/Character";

import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ROUTES from "../../utils/routes";

export default function CharacterPage() {

  const { characters } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { characterId } = useParams();

  const character = new Character(characters[characterId])


  return (
    <div className="character-page">
      <Link
        to={ROUTES.CHARACTERS}
        className="btn btn-secondary rounded-0"
      >
        Back to Characters
      </Link>
      <p>{character.name}</p>
    </div>
  )
}