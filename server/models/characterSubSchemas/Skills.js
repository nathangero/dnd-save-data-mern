import { Schema } from "mongoose";
import SkillProficiency from "./SkillProficiency.js";

const Skills = new Schema({
  acrobatics: {
    type: SkillProficiency,
    required: true
  },
  animalHandling: {
    type: SkillProficiency,
    required: true
  },
  arcana: {
    type: SkillProficiency,
    required: true
  },
  athletics: {
    type: SkillProficiency,
    required: true
  },
  deception: {
    type: SkillProficiency,
    required: true
  },
  history: {
    type: SkillProficiency,
    required: true
  },
  insight: {
    type: SkillProficiency,
    required: true
  },
  intimidation: {
    type: SkillProficiency,
    required: true
  },
  investigation: {
    type: SkillProficiency,
    required: true
  },
  medicine: {
    type: SkillProficiency,
    required: true
  },
  nature: {
    type: SkillProficiency,
    required: true
  },
  perception: {
    type: SkillProficiency,
    required: true
  },
  performance: {
    type: SkillProficiency,
    required: true
  },
  persuasion: {
    type: SkillProficiency,
    required: true
  },
  religion: {
    type: SkillProficiency,
    required: true
  },
  sleightOfHand: {
    type: SkillProficiency,
    required: true
  },
  stealth: {
    type: SkillProficiency,
    required: true
  },
  survival: {
    type: SkillProficiency,
    required: true
  },
});

export default Skills;