import { Schema } from "mongoose";

const Skills = new Schema({
  acrobatics: {
    type: Boolean,
    required: true
  },
  animalHandling: {
    type: Boolean,
    required: true
  },
  arcana: {
    type: Boolean,
    required: true
  },
  athletics: {
    type: Boolean,
    required: true
  },
  deception: {
    type: Boolean,
    required: true
  },
  history: {
    type: Boolean,
    required: true
  },
  insight: {
    type: Boolean,
    required: true
  },
  intimidation: {
    type: Boolean,
    required: true
  },
  investigation: {
    type: Boolean,
    required: true
  },
  medicine: {
    type: Boolean,
    required: true
  },
  nature: {
    type: Boolean,
    required: true
  },
  perception: {
    type: Boolean,
    required: true
  },
  performance: {
    type: Boolean,
    required: true
  },
  persuasion: {
    type: Boolean,
    required: true
  },
  religion: {
    type: Boolean,
    required: true
  },
  sleightOfHand: {
    type: Boolean,
    required: true
  },
  stealth: {
    type: Boolean,
    required: true
  },
  survival: {
    type: Boolean,
    required: true
  },
});

export default Skills;