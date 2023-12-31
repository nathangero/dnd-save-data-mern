
import { useSelector } from "react-redux";
import CharacterSummary from "../components/CharacterSummary";

export default function Characters() {

  const { characters } = useSelector(state => state.user);

  return (
    <>
      <h1 className="text-center">Your Characters</h1>

      {characters.map((character, index) => (
        <div key={index}>
          <CharacterSummary character={character} />
          <br />
        </div>
      ))}
    </>
  )
}