import { Schema, model } from "mongoose";
import AbilityScores from "./characterSubSchemas/AbilityScores.js";
import DeathSaves from "./characterSubSchemas/DeathSaves.js";
import Equipment from "./characterSubSchemas/Equipment.js";
import FeatureTrait from "./characterSubSchemas/FeatureTrait.js";
import Hp from "./characterSubSchemas/Hp.js";
import Language from "./characterSubSchemas/Language.js";
import Proficiency from "./characterSubSchemas/Proficiency.js";
import SavingThrows from "./characterSubSchemas/SavingThrows.js";
import Skills from "./characterSubSchemas/Skills.js";
import SpellSlotLevel from "./characterSubSchemas/SpellSlotLevel.js";
import SpellLevel from "./characterSubSchemas/SpellLevel.js";
import Treasure from "./characterSubSchemas/Treasure.js";
import Weapon from "./characterSubSchemas/Weapon.js";


const characterSchema = new Schema({
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
export default Character;