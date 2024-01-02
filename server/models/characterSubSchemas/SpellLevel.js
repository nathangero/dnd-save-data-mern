import { Schema } from "mongoose";
import Spell from "./Spell.js";

const SpellLevel = new Schema({
  cantrips: {
    type: [Spell]
  },
  level_1: {
    type: [Spell]
  },
  level_2: {
    type: [Spell]
  },
  level_3: {
    type: [Spell]
  },
  level_4: {
    type: [Spell]
  },
  level_5: {
    type: [Spell]
  },
  level_6: {
    type: [Spell]
  },
  level_7: {
    type: [Spell]
  },
  level_8: {
    type: [Spell]
  },
  level_9: {
    type: [Spell]
  }
});

export default SpellLevel;