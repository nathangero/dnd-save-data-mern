
import { useSelector } from "react-redux";
import CharacterSummary from "../components/CharacterSummary";
import { Link } from "react-router-dom";
import ROUTES from "../utils/routes";

export default function Characters() {

  const { characters } = useSelector(state => state.user);

  return (
    <section className="page">
      <h1 className="text-center mb-3">Your Characters</h1>

      <div className="d-flex justify-content-center">
        <Link className="btn btn-primary mb-5" to={ROUTES.CHARACTER_CREATE}>Create New Character</Link>
      </div>

      {Object.values(characters).map((character, index) => (
        <div key={index}>
          <CharacterSummary character={character} />
          <br />
        </div>
      ))}
    </section>
  )
}