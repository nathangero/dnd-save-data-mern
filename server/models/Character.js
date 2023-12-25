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
const SpellSlot = require("./characterSubSchemas/Proficiency");
const Spell = require("./characterSubSchemas/Proficiency");
const Treasure = require("./characterSubSchemas/Proficiency");
const Weapon = require("./characterSubSchemas/Proficiency");

const characterSchema = new Schema({
  alignment: {
    type: String,
    required: true,
    trim: true
  },
  armor: {
    type: Int,
    required: true,
  },
  background: {
    type: String,
    required: true,
    trim: true
  },
  class: {
    type: String,
    required: true,
    trim: true
  },
  deathSaves: {
    type: DeathSaves,
    required: true
  },
  equipment: {
    type: [Equipment],
    required: true
  },
  featureTraits: {
    type: [FeatureTrait],
    required: true
  },
  gold: {
    type: Int,
    required: true
  },
  hp: {
    type: Hp,
    required: true
  },
  inspriation: {
    type: Int,
    required: true
  },
  languages: {
    type: [Language],
    required: true
  },
  level: {
    type: Int,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  proficiencies: {
    type: [Proficiency],
    required: true
  },
  race: {
    type: String,
    required: true
  },
  savingThrows: {
    type: [SavingThrow],
    required: true
  },
  scores: {
    type: [AbilityScore],
    required: true
  },
  skills: {
    type: [Skill],
    required: true
  },
  speed: {
    type: Int,
    required: true
  },
  spellCastStat: {
    type: String,
    required: true,
    trim: true
  },
  spellSlots: {
    type: [SpellSlot],
    required: true
  },
  spells: {
    type: [Spell],
    required: true
  },
  timeCreated: {
    type: Date,
    default: Date.now
  },
  treasures: {
    type: [Treasure],
    required: true
  },
  weapons: {
    type: [Weapon],
    required: true
  }
});

const Character = model("Character", characterSchema);
module.exports = Character;