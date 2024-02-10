export const SECTION_TITLE = {
  BACKGROUND: "character-section-background",
  CHARACTER_INFO: "character-section-info",
  ABILITY_SCORES: "character-section-scores",
  SAVING_THROWS: "character-section-saving-throws",
  SKILLS: "character-section-skills",
  FEATURES_TRAITS: "character-section-features-traits",
  WEAPONS: "character-section-weapons",
  SPELL_SLOTS: "character-section-spell-slots",
  SPELLS: "character-section-spells",
  PROFICIENCIES: "character-section-proficiencies",
  EQUIPMENT: "character-section-equipment",
  LANGUAGES: "character-section-languages",
  TREASURES: "character-section-treasures",
  BACKUP: "backup-character",
}

export const CHARACTER_VIEW_ID = {
  BACKGROUND: "character-view-background",
  CHARACTER_INFO: "character-view-info",
  ABILITY_SCORES: "character-view-scores",
  SAVING_THROWS: "character-view-saving-throws",
  SKILLS: "character-view-skills",
  FEATURES_TRAITS: "character-view-features-traits",
  WEAPONS: "character-view-weapons",
  SPELL_SLOTS: "character-view-spell-slots",
  SPELLS: "character-view-spells",
  PROFICIENCIES: "character-view-proficiencies",
  EQUIPMENT: "character-view-equipment",
  LANGUAGES: "character-view-languages",
  TREASURES: "character-view-treasures",
}

export const SECTION_TITLE_NAME = {
  BACKGROUND: "Background",
  CHARACTER_INFO: "Character Info",
  ABILITY_SCORES: "Ability Scores",
  SAVING_THROWS: "Saving Throws",
  SKILLS: "Skills",
  FEATURES_TRAITS: "Feats & Traits",
  WEAPONS: "Weapons",
  SPELL_SLOTS: "Spell Slots",
  SPELLS: "Spells",
  PROFICIENCIES: "Proficiencies",
  EQUIPMENT: "Equipment",
  LANGUAGES: "Languages",
  TREASURES: "Treasures",
}


export const ABILITY_SCORE_KEYS = {
  STR: "str",
  DEX: "dex",
  CON: "con",
  INT: "int",
  WIS: "wis",
  CHA: "cha"
}

export const ABILITY_SCORE_NAMES = {
  [ABILITY_SCORE_KEYS.STR]: "Strength",
  [ABILITY_SCORE_KEYS.DEX]: "Dexterity",
  [ABILITY_SCORE_KEYS.CON]: "Constitution",
  [ABILITY_SCORE_KEYS.INT]: "Intelligence",
  [ABILITY_SCORE_KEYS.WIS]: "Wisdom",
  [ABILITY_SCORE_KEYS.CHA]: "Charisma"
}

export const ABILITY_SCORE_NAMES_TO_KEY = {
  "Strength": ABILITY_SCORE_KEYS.STR,
  "Dexterity": ABILITY_SCORE_KEYS.DEX,
  "Constitution": ABILITY_SCORE_KEYS.CON,
  "Intelligence": ABILITY_SCORE_KEYS.INT,
  "Wisdom": ABILITY_SCORE_KEYS.WIS,
  "Charisma": ABILITY_SCORE_KEYS.CHA,
}

export const ACTION_TYPES = {
  NONE: "none",
  ACTION: "action",
  BONUS: "bonus",
  PASSIVE: "passive",
}

export const ALIGNMENTS = {
  LAW_GOOD: "lawful_good",
  LAW_NEU: "lawful_neutral",
  LAW_EVIL: "lawful_evil",
  NEU_GOOD: "neutral_good",
  TRUE_NEU: "true_neutral",
  NEU_EVIL: "neutral_evil",
  CHA_GOOD: "chaotic_good",
  CHA_NEU: "chaotic_neutral",
  CHA_EVIL: "chaotic_evil",
  CUSTOM: "custom",
}

export const ALIGNMENT_NAMES = {
  [ALIGNMENTS.LAW_GOOD]: "Lawful Good",
  [ALIGNMENTS.LAW_NEU]: "Lawful Neutral",
  [ALIGNMENTS.LAW_EVIL]: "Lawful Evil",
  [ALIGNMENTS.NEU_GOOD]: "Neutral Good",
  [ALIGNMENTS.TRUE_NEU]: "True Neutral",
  [ALIGNMENTS.NEU_EVIL]: "Neutral Evil",
  [ALIGNMENTS.CHA_GOOD]: "Chaotic Good",
  [ALIGNMENTS.CHA_NEU]: "Chaotic Neutral",
  [ALIGNMENTS.CHA_EVIL]: "Chaotic Evil",
  [ALIGNMENTS.CUSTOM]: "Custom",
}

export const ALIGNMENT_NAMES_TO_KEY = {
  "Lawful Good": ALIGNMENTS.LAW_GOOD,
  "Lawful Neutral": ALIGNMENTS.LAW_NEU,
  "Lawful Evil": ALIGNMENTS.LAW_EVIL,
  "Neutral Good": ALIGNMENTS.NEU_GOOD,
  "True Neutral": ALIGNMENTS.TRUE_NEU,
  "Neutral Evil": ALIGNMENTS.NEU_EVIL,
  "Chaotic Good": ALIGNMENTS.CHA_GOOD,
  "Chaotic Neutral": ALIGNMENTS.CHA_NEU,
  "Chaotic Evil": ALIGNMENTS.CHA_EVIL,
  "Custom": ALIGNMENTS.CUSTOM,
}

export const CHARACTER_CLASSES = {
  BARBARIAN: "barbarian",
  BARD: "bard",
  CLERIC: "cleric",
  DRUID: "druid",
  FIGHTER: "fighter",
  MONK: "monk",
  PALADIN: "paladin",
  RANGER: "ranger",
  ROGUE: "rogue",
  SORCERER: "sorcerer",
  WARLOCK: "warlock",
  WIZARD: "wizard",
  CUSTOM: "custom",
}

export const DIE_TYPES = {
  D4: "d4",
  D6: "d6",
  D8: "d8",
  D10: "d10",
  D12: "d12",
  D20: "d12",
}

export const CLASS_HIT_DIE = {
  [CHARACTER_CLASSES.BARBARIAN]: [DIE_TYPES.D12],
  [CHARACTER_CLASSES.BARD]: [DIE_TYPES.D8],
  [CHARACTER_CLASSES.CLERIC]: [DIE_TYPES.D8],
  [CHARACTER_CLASSES.DRUID]: [DIE_TYPES.D8],
  [CHARACTER_CLASSES.FIGHTER]: [DIE_TYPES.D10],
  [CHARACTER_CLASSES.MONK]: [DIE_TYPES.D8],
  [CHARACTER_CLASSES.PALADIN]: [DIE_TYPES.D10],
  [CHARACTER_CLASSES.RANGER]: [DIE_TYPES.D10],
  [CHARACTER_CLASSES.ROGUE]: [DIE_TYPES.D8],
  [CHARACTER_CLASSES.SORCERER]: [DIE_TYPES],
  [CHARACTER_CLASSES.WARLOCK]: [DIE_TYPES.D8],
  [CHARACTER_CLASSES.WIZARD]: [DIE_TYPES.D6],
  [CHARACTER_CLASSES.CUSTOM]: "",
}

export const FEAT_TRAIT_TYPES = {
  NONE: "none",
  CLASS: "class",
  RACE: "racial",
  OTHER: "other",
}

export const LANGUAGE_TYPES = {
  FLUENT: "fluent",
  SPOKEN: "spoken",
  WRITTEN: "written",
}

export const SKILL_KEYS = {
  ACROBATICS: "acrobatics",
  ANIMAL_HANDLING: "animalHandling",
  ARCANA: "arcana",
  ATHLETICS: "athletics",
  DECEPTION: "deception",
  HISTORY: "history",
  INSIGHT: "insight",
  INTIMIDATION: "intimidation",
  INVESTIGATION: "investigation",
  MEDICINE: "medicine",
  NATURE: "nature",
  PERCEPTION: "perception",
  PERFORMANCE: "performance",
  PERSUASION: "persuasion",
  RELIGION: "religion",
  SLEIGHT_OF_HAND: "sleightOfHand",
  STEALTH: "stealth",
  SURVIVAL: "survival",
}

export const SKILL_NAMES = {
  [SKILL_KEYS.ACROBATICS]: "Acrobatics",
  [SKILL_KEYS.ANIMAL_HANDLING]: "Animal Handling",
  [SKILL_KEYS.ARCANA]: "Arcana",
  [SKILL_KEYS.ATHLETICS]: "Athletics",
  [SKILL_KEYS.DECEPTION]: "Deception",
  [SKILL_KEYS.HISTORY]: "History",
  [SKILL_KEYS.INSIGHT]: "Insight",
  [SKILL_KEYS.INTIMIDATION]: "Intimidation",
  [SKILL_KEYS.INVESTIGATION]: "Investigation",
  [SKILL_KEYS.MEDICINE]: "Medicine",
  [SKILL_KEYS.NATURE]: "Nature",
  [SKILL_KEYS.PERCEPTION]: "Perception",
  [SKILL_KEYS.PERFORMANCE]: "Performance",
  [SKILL_KEYS.PERSUASION]: "Persuasion",
  [SKILL_KEYS.RELIGION]: "Religion",
  [SKILL_KEYS.SLEIGHT_OF_HAND]: "Sleight of Hand",
  [SKILL_KEYS.STEALTH]: "Stealth",
  [SKILL_KEYS.SURVIVAL]: "Survival",
}

export const SKILL_NAME_SCORES = {
  [SKILL_KEYS.ACROBATICS]: "dex",
  [SKILL_KEYS.ANIMAL_HANDLING]: "wis",
  [SKILL_KEYS.ARCANA]: "int",
  [SKILL_KEYS.ATHLETICS]: "str",
  [SKILL_KEYS.DECEPTION]: "cha",
  [SKILL_KEYS.HISTORY]: "int",
  [SKILL_KEYS.INSIGHT]: "wis",
  [SKILL_KEYS.INTIMIDATION]: "cha",
  [SKILL_KEYS.INVESTIGATION]: "int",
  [SKILL_KEYS.MEDICINE]: "wis",
  [SKILL_KEYS.NATURE]: "int",
  [SKILL_KEYS.PERCEPTION]: "wis",
  [SKILL_KEYS.PERFORMANCE]: "cha",
  [SKILL_KEYS.PERSUASION]: "cha",
  [SKILL_KEYS.RELIGION]: "int",
  [SKILL_KEYS.SLEIGHT_OF_HAND]: "dex",
  [SKILL_KEYS.STEALTH]: "dex",
  [SKILL_KEYS.SURVIVAL]: "wis",
}

export const SKILL_PROFICIENCY = {
  PROFICIENT: "proficient",
  EXPERTISE: "expertise",
}

export const SPELL_DURATION_TYPES = {
  INSTANT: "instant",
  SECONDS: "seconds",
  MINUTES: "minutes",
  HOURS: "hours",
}

export const SPELL_LEVEL_KEYS = {
  CANTRIPS: "cantrips",
  LEVEL_1: "level_1",
  LEVEL_2: "level_2",
  LEVEL_3: "level_3",
  LEVEL_4: "level_4",
  LEVEL_5: "level_5",
  LEVEL_6: "level_6",
  LEVEL_7: "level_7",
  LEVEL_8: "level_8",
  LEVEL_9: "level_9",
}

export const SPELL_LEVEL_NAMES = {
  [SPELL_LEVEL_KEYS.CANTRIPS]: "Cantrips",
  [SPELL_LEVEL_KEYS.LEVEL_1]: "Level 1",
  [SPELL_LEVEL_KEYS.LEVEL_2]: "Level 2",
  [SPELL_LEVEL_KEYS.LEVEL_3]: "Level 3",
  [SPELL_LEVEL_KEYS.LEVEL_4]: "Level 4",
  [SPELL_LEVEL_KEYS.LEVEL_5]: "Level 5",
  [SPELL_LEVEL_KEYS.LEVEL_6]: "Level 6",
  [SPELL_LEVEL_KEYS.LEVEL_7]: "Level 7",
  [SPELL_LEVEL_KEYS.LEVEL_8]: "Level 8",
  [SPELL_LEVEL_KEYS.LEVEL_9]: "Level 9",
}

export const SPELL_LEVEL_NAMES_TO_KEY = {
  "Cantrips": SPELL_LEVEL_KEYS.CANTRIPS,
  "Level 1": [SPELL_LEVEL_KEYS.LEVEL_1],
  "Level 2": [SPELL_LEVEL_KEYS.LEVEL_2],
  "Level 3": [SPELL_LEVEL_KEYS.LEVEL_3],
  "Level 4": [SPELL_LEVEL_KEYS.LEVEL_4],
  "Level 5": [SPELL_LEVEL_KEYS.LEVEL_5],
  "Level 6": [SPELL_LEVEL_KEYS.LEVEL_6],
  "Level 7": [SPELL_LEVEL_KEYS.LEVEL_7],
  "Level 8": [SPELL_LEVEL_KEYS.LEVEL_8],
  "Level 9": [SPELL_LEVEL_KEYS.LEVEL_9],
}

export const WEAPON_CATEGORIES = {
  SIMPLE: "simple",
  MARTIAL: "martial",
  IMPROVISED: "improvised",
}