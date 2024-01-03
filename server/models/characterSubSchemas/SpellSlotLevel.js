import { Schema } from "mongoose";
import SpellSlot from "./SpellSlot.js";

const SpellSlotLevel = new Schema({
  level_1: {
    type: [SpellSlot],
  },
  level_2: {
    type: [SpellSlot],
  },
  level_3: {
    type: [SpellSlot],
  },
  level_4: {
    type: [SpellSlot],
  },
  level_5: {
    type: [SpellSlot],
  },
  level_6: {
    type: [SpellSlot],
  },
  level_7: {
    type: [SpellSlot],
  },
  level_8: {
    type: [SpellSlot],
  },
  level_9: {
    type: [SpellSlot],
  },
});

export default SpellSlotLevel;