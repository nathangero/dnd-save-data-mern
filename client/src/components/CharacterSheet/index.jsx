import "./style.css";

export default function CharacterSheet() {

  return (
    <section className="character-sheet m-3 p-3">
      <h2>Dungeons & Dragons 5E Character Sheet</h2>

      <div className="character-header row-sm">
        <div className="character-info col-sm-3">
          <div>
            <label>Character Name</label>
            <br />
            <input />
          </div>
          <div>
            <label>Player Name</label>
            <br />
            <input />
          </div>
        </div>

        <div className="character-background col-sm-8">
          <div>
            <label>Class</label>
            <br />
            <input />
          </div>
          <div>
            <label>Level</label>
            <br />
            <input />
          </div>
          <div>
            <label>Background</label>
            <br />
            <input />
          </div>
          <div>
            <label>Race</label>
            <br />
            <input />
          </div>
          <div>
            <label>Alignment</label>
            <br />
            <input />
          </div>
          <div>
            <label>Experience Points</label>
            <br />
            <input />
          </div>
        </div>
      </div>
    </section>
  )
}