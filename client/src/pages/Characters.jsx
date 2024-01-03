
import { useSelector } from "react-redux";
import CharacterSummary from "../components/CharacterSummary";

export default function Characters() {

  const { username, characters } = useSelector(state => state.user);

  return (
    <>
      <h1 className="text-center">{username}&apos;s Characters</h1>

      {characters.map((character, index) => (
        <div key={index} >
          <CharacterSummary character={character} />
        </div>
      ))}
    </>
  )
}