import { Schema } from "mongoose";
import SpellSlot from "./SpellSlot";

export const SpellSlotLevel = new Schema({
  level_1: {
    type: SpellSlot,
    require: true
  },
  level_2: {
    type: SpellSlot,
    require: true
  },
  level_3: {
    type: SpellSlot,
    require: true
  },
  level_4: {
    type: SpellSlot,
    require: true
  },
  level_5: {
    type: SpellSlot,
    require: true
  },
  level_6: {
    type: SpellSlot,
    require: true
  },
  level_7: {
    type: SpellSlot,
    require: true
  },
  level_8: {
    type: SpellSlot,
    require: true
  },
  level_9: {
    type: SpellSlot,
    require: true
  }
});

export { SpellSlotLevel };