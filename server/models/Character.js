const { Schema, model } = require("mongoose");
const deathSavesSchema = require("./characterSubSchemas/DeathSaves");
const equipmentSchema = require("./characterSubSchemas/Equipment");
const equipmentSchema = require("./characterSubSchemas/Equipment");
const featureTraitSchema = require("./characterSubSchemas/FeatureTrait");
const hpSchema = require("./characterSubSchemas/Hp");
const languageSchema = require("./characterSubSchemas/Language");
const proficiencySchema = require("./characterSubSchemas/Proficiency");
const savingThrowSchema = require("./characterSubSchemas/Proficiency");
const scoreSchema = require("./characterSubSchemas/AbilityScore");
const skillSchema = require("./characterSubSchemas/Skill");
const spellSlotSchema = require("./characterSubSchemas/Proficiency");
const spellSchema = require("./characterSubSchemas/Proficiency");
const treasureSchema = require("./characterSubSchemas/Proficiency");
const weaponSchema = require("./characterSubSchemas/Proficiency");

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
    type: deathSavesSchema,
    required: true
  },
  equipment: {
    type: [equipmentSchema],
    required: true
  },
  featureTraits: {
    type: [featureTraitSchema],
    required: true
  },
  gold: {
    type: Int,
    required: true
  },
  hp: {
    type: hpSchema,
    required: true
  },
  inspriation: {
    type: Int,
    required: true
  },
  languages: {
    type: [languageSchema],
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
    type: [proficiencySchema],
    required: true
  },
  race: {
    type: String,
    required: true
  },
  savingThrows: {
    type: [savingThrowSchema],
    required: true
  },
  scores: {
    type: [scoreSchema],
    required: true
  },
  skills: {
    type: [skillSchema],
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
    type: [spellSlotSchema],
    required: true
  },
  spells: {
    type: [spellSchema],
    required: true
  },
  timeCreated: {
    type: Date,
    default: Date.now
  },
  treasures: {
    type: [treasureSchema],
    required: true
  },
  weapons: {
    type: [weaponSchema],
    required: true
  }
});

const Character = model("Character", characterSchema);
module.exports = Character;