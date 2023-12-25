const { Schema, model } = require("mongoose");
import AbilityScores from "./characterSubSchemas/AbilityScores";
import DeathSaves from "./characterSubSchemas/DeathSaves";
import Equipment from "./characterSubSchemas/Equipment";
import FeatureTrait from "./characterSubSchemas/FeatureTrait";
import Hp from "./characterSubSchemas/Hp";
import Language from "./characterSubSchemas/Language";
import Proficiency from "./characterSubSchemas/Proficiency";
import SavingThrows from "./characterSubSchemas/SavingThrows";
import Skills from "./characterSubSchemas/Skills";
import SpellSlotLevel from "./characterSubSchemas/SpellSlotLevel";
import SpellLevel from "./characterSubSchemas/SpellLevel";
import Treasure from "./characterSubSchemas/Treasure";
import Weapon from "./characterSubSchemas/Weapon";


export const characterSchema = new Schema({
  alignment: {
    type: String,
    require: true,
    trim: true
  },
  armor: {
    type: Number,
    require: true,
  },
  background: {
    type: String,
    require: true,
    trim: true
  },
  class: {
    type: String,
    require: true,
    trim: true
  },
  deathSaves: {
    type: DeathSaves,
    require: true
  },
  equipment: {
    type: [Equipment],
  },
  featureTraits: {
    type: [FeatureTrait],
  },
  gold: {
    type: Number,
  },
  hp: {
    type: Hp,
    require: true
  },
  inspriation: {
    type: Number,
  },
  languages: {
    type: [Language],
  },
  level: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true,
    trim: true
  },
  proficiencies: {
    type: [Proficiency]
  },
  race: {
    type: String,
    require: true
  },
  savingThrows: {
    type: SavingThrows,
    require: true
  },
  scores: {
    type: AbilityScores,
    require: true
  },
  skills: {
    type: Skills,
    require: true
  },
  speed: {
    type: Number,
    require: true
  },
  spellCastStat: {
    type: String,
    trim: true
  },
  spellSlots: {
    type: SpellSlotLevel,
  },
  spells: {
    type: SpellLevel,
  },
  timeCreated: {
    type: Date,
    default: Date.now
  },
  treasures: {
    type: [Treasure],
  },
  weapons: {
    type: [Weapon],
  }
}, {
  id: true
});

const Character = model("Character", characterSchema);
export { Character };