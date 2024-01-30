const typeDefs = `
  scalar Date

  type User {
    _id: ID
    username: String
    characters: [Character]
  }

  type Character {
    _id: ID
    alignment: String
    armor: Int
    background: String
    class: String
    deathSaves: DeathSaves
    equipment: [Equipment]
    featureTraits: [FeatureTrait]
    gold: Int
    hp: Hp
    inspiration: Int
    languages: [Language]
    level: Int
    name: String
    proficiencies: [Proficiency]
    race: String
    savingThrows: SavingThrows
    scores: AbilityScores
    skills: Skills
    speed: Int
    spellCastStat: String
    spellSlots: SpellSlotLevel
    spells: SpellLevel
    timeCreated: Date
    treasures: [Treasure]
    weapons: [Weapon]
  }

  type DeathSaves {
    _id: ID
    failures: Int
    successes: Int
  }

  type Equipment {
    _id: ID
    amount: Int
    description: String
    name: String!
  }

  type FeatureTrait {
    _id: ID
    actionType: String
    description: String
    name: String!
    traitType: String
    uses: Int
  }

  type Hp {
    _id: ID
    current: Int!
    dieType: String!
    dieAmountCurrent: Int!
    max: Int!
    temp: Int
  }

  type Language {
    _id: ID
    name: String!
    proficiency: String!
  }

  type Proficiency {
    _id: ID
    description: String
    name: String!
  }

  type SavingThrows {
    _id: ID
    cha: Boolean!
    con: Boolean!
    dex: Boolean!
    int: Boolean!
    str: Boolean!
    wis: Boolean!
  }

  type AbilityScores {
    _id: ID
    cha: Int!
    con: Int!
    dex: Int!
    int: Int!
    str: Int!
    wis: Int!
  }

  type SkillProficiency {
    _id: ID
    proficient: Boolean!
    expertise: Boolean!
  }

  type Skills {
    _id: ID
    acrobatics: SkillProficiency!
    animalHandling: SkillProficiency!
    arcana: SkillProficiency!
    athletics: SkillProficiency!
    deception: SkillProficiency!
    history: SkillProficiency!
    insight: SkillProficiency!
    intimidation: SkillProficiency!
    investigation: SkillProficiency!
    medicine: SkillProficiency!
    nature: SkillProficiency!
    perception: SkillProficiency!
    performance: SkillProficiency!
    persuasion: SkillProficiency!
    religion: SkillProficiency!
    sleightOfHand: SkillProficiency!
    stealth: SkillProficiency!
    survival: SkillProficiency!
  }

  type SpellSlotLevel {
    _id: ID
    level_1: SpellSlot
    level_2: SpellSlot
    level_3: SpellSlot
    level_4: SpellSlot
    level_5: SpellSlot
    level_6: SpellSlot
    level_7: SpellSlot
    level_8: SpellSlot
    level_9: SpellSlot
  }

  type SpellSlot {
    _id: ID
    current: Int!
    max: Int!
  }

  type SpellLevel {
    _id: ID
    cantrips: [Spell]
    level_1: [Spell]
    level_2: [Spell]
    level_3: [Spell]
    level_4: [Spell]
    level_5: [Spell]
    level_6: [Spell]
    level_7: [Spell]
    level_8: [Spell]
    level_9: [Spell]
  }

  type Spell {
    _id: ID
    castingTime: Int!
    description: String
    duration: Int!
    durationType: String!
    name: String!
    range: Int!
  }

  type Treasure {
    _id: ID
    amount: Int!
    description: String
    name: String!
  }

  type Weapon {
    _id: ID
    amount: Int!
    attackDamageStat: String!
    category: String
    description: String
    dieType: String!
    name: String!
    proficient: Boolean!
  }

  ###### Input Types

  input CharacterInput {
    _id: ID
    alignment: String
    armor: Int
    background: String
    class: String
    deathSaves: DeathSavesInput
    equipment: [EquipmentInput]
    featureTraits: [FeatureTraitInput]
    gold: Int
    hp: HpInput
    inspiration: Int
    languages: [LanguageInput]
    level: Int
    name: String
    proficiencies: [ProficiencyInput]
    race: String
    savingThrows: SavingThrowsInput
    scores: AbilityScoresInput
    skills: SkillsInput
    speed: Int
    spellCastStat: String
    spellSlots: SpellSlotLevelInput
    spells: SpellLevelInput
    timeCreated: Date
    treasures: [TreasureInput]
    weapons: [WeaponInput]
  }

  input DeathSavesInput {
    _id: ID
    failures: Int
    successes: Int
  }

  input EquipmentInput {
    _id: ID
    amount: Int
    description: String
    name: String!
  }

  input FeatureTraitInput {
    _id: ID
    actionType: String
    description: String
    name: String!
    traitType: String
    uses: Int
  }

  input HpInput {
    _id: ID
    current: Int!
    dieType: String!
    dieAmountCurrent: Int!
    max: Int!
    temp: Int
  }

  input LanguageInput {
    _id: ID
    name: String!
    proficiency: String!
  }

  input ProficiencyInput {
    _id: ID
    description: String
    name: String!
  }

  input SavingThrowsInput {
    _id: ID
    cha: Boolean!
    con: Boolean!
    dex: Boolean!
    int: Boolean!
    str: Boolean!
    wis: Boolean!
  }

  input AbilityScoresInput {
    _id: ID
    cha: Int!
    con: Int!
    dex: Int!
    int: Int!
    str: Int!
    wis: Int!
  }

  input SkillsInput {
    _id: ID
    acrobatics: Boolean!
    animalHandling: Boolean!
    arcana: Boolean!
    athletics: Boolean!
    deception: Boolean!
    history: Boolean!
    insight: Boolean!
    intimidation: Boolean!
    investigation: Boolean!
    medicine: Boolean!
    nature: Boolean!
    perception: Boolean!
    performance: Boolean!
    persuasion: Boolean!
    religion: Boolean!
    sleightOfHand: Boolean!
    stealth: Boolean!
    survival: Boolean!
  }

  input SpellSlotLevelInput {
    _id: ID
    level_1: SpellSlotInput
    level_2: SpellSlotInput
    level_3: SpellSlotInput
    level_4: SpellSlotInput
    level_5: SpellSlotInput
    level_6: SpellSlotInput
    level_7: SpellSlotInput
    level_8: SpellSlotInput
    level_9: SpellSlotInput
  }

  input SpellSlotInput {
    _id: ID
    current: Int!
    max: Int!
  }

  input SpellLevelInput {
    _id: ID
    cantrips: [SpellInput]
    level_1: [SpellInput]
    level_2: [SpellInput]
    level_3: [SpellInput]
    level_4: [SpellInput]
    level_5: [SpellInput]
    level_6: [SpellInput]
    level_7: [SpellInput]
    level_8: [SpellInput]
    level_9: [SpellInput]
  }

  input SpellInput {
    _id: ID
    castingTime: Int!
    description: String
    duration: Int!
    durationType: String!
    name: String!
    range: Int!
  }

  input TreasureInput {
    _id: ID
    amount: Int!
    description: String
    name: String!
  }

  input WeaponInput {
    _id: ID
    amount: Int!
    attackDamageStat: String!
    category: String
    description: String
    dieType: String!
    name: String!
    proficient: Boolean!
  }

  ###### Resolvers

  type Query {
    getMe: User
    checkUser(username: String!): User
  }

  type Mutation {
    addUser(_id: String!, username: String!): User
    updateCharacter(_id: String!, character: CharacterInput!): Character
  }
`;

export default typeDefs;