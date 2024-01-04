
import { useSelector } from "react-redux";
import CharacterSummary from "../components/CharacterSummary";

export default function Characters() {

  const { characters } = useSelector(state => state.user);

  return (
    <section className="page">
      <h1 className="text-center mb-3">Your Characters</h1>
      {characters.map((character, index) => (
        <div key={index}>
          <CharacterSummary character={character} characterId={index}/>
          <br />
        </div>
      ))}
    </section>
  )
}