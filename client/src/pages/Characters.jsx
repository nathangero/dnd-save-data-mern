
import { useSelector } from "react-redux";
import CharacterSummary from "../components/CharacterSummary";
import { Link } from "react-router-dom";
import ROUTES from "../utils/routes";

export default function Characters() {

  const { characters } = useSelector(state => state.user);

  return (
    <section className="page">
      <h1 className="text-center mb-3">Your Characters</h1>
      
      {/* <Link className="btn btn-primary" to={ROUTES.CHARACTER_CREATE}>Create Character</Link> */}

      {characters.map((character, index) => (
        <div key={index}>
          <CharacterSummary char={character} characterId={index}/>
          <br />
        </div>
      ))}
    </section>
  )
}