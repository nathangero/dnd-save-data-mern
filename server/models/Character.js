const { Schema, model } = require("mongoose");
const AbilityScores = require("./characterSubSchemas/AbilityScores");
const DeathSaves = require("./characterSubSchemas/DeathSaves");
const Equipment = require("./characterSubSchemas/Equipment");
const FeatureTrait = require("./characterSubSchemas/FeatureTrait");
const Hp = require("./characterSubSchemas/Hp");
const Language = require("./characterSubSchemas/Language");
const Proficiency = require("./characterSubSchemas/Proficiency");
const SavingThrows = require("./characterSubSchemas/SavingThrows");
const Skills = require("./characterSubSchemas/Skills");
const SpellSlotLevel = require("./characterSubSchemas/SpellSlotLevel");
const SpellLevel = require("./characterSubSchemas/SpellLevel");
const Treasure = require("./characterSubSchemas/Treasure");
const Weapon = require("./characterSubSchemas/Weapon");

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
    type: [SpellLevel],
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
module.exports = Character;