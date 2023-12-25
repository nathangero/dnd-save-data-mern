const { Schema, model } = require("mongoose");
const AbilityScore = require("./characterSubSchemas/AbilityScore");
const DeathSaves = require("./characterSubSchemas/DeathSaves");
const Equipment = require("./characterSubSchemas/Equipment");
const FeatureTrait = require("./characterSubSchemas/FeatureTrait");
const Hp = require("./characterSubSchemas/Hp");
const Language = require("./characterSubSchemas/Language");
const Proficiency = require("./characterSubSchemas/Proficiency");
const SavingThrow = require("./characterSubSchemas/Proficiency");
const Skill = require("./characterSubSchemas/Skill");
const SpellSlotLevel = require("./characterSubSchemas/SpellSlotLevel");
const Spell = require("./characterSubSchemas/Spell");
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
    type: [SavingThrow],
    require: true
  },
  scores: {
    type: [AbilityScore],
    require: true
  },
  skills: {
    type: [Skill],
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
    type: [SpellSlotLevel],
  },
  spells: {
    type: [Spell],
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
});

const Character = model("Character", characterSchema);
module.exports = Character;