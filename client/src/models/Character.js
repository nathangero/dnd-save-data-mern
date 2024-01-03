export function Character(
  _id = "",
  alignment = "",
  armor = "",
  background = "",
  className = "",
  deathSaves = {},
  equipment = [],
  featureTraits = [],
  gold = 0,
  hp = {},
  inspriation = 0,
  languages = [],
  level = 1,
  name = "",
  proficiencies = [],
  race = "",
  savingThrows = {},
  scores = {},
  skills = {},
  speed = 0,
  spellCastStat = "",
  spellSlots = {},
  treasures = [],
  weapons = []
) {
  this._id = _id
  this.alignment = alignment
  this.armor = armor
  this.background = background
  this.class = className
  this.deathSaves = deathSaves
  this.equipment = equipment
  this.featureTraits = featureTraits
  this.gold = gold
  this.hp = hp
  this.inspriation = inspriation
  this.languages = languages
  this.level = level
  this.name = name
  this.proficiencies = proficiencies
  this.race = race
  this.savingThrows = savingThrows
  this.scores = scores
  this.skills = skills
  this.speed = speed
  this.spellCastStat = spellCastStat
  this.spellSlots = spellSlots
  this.timeCreated = Date.now
  this.treasures = treasures
  this.weapons = weapons
}

/**
 * 
 * @param {Object} snapshot 
 * @returns 
 */
Character.prototype.fromSnapshot = function (snapshot) {
  // console.log("snapshot:", snapshot);

  const { _id, alignment, armor, background, class: className, deathSaves, equipment, featureTraits, gold, hp, inspriation, languages, level, name, proficiencies, race, savingThrows, scores, skills, speed, spellCastStat, spellSlots, treasures, weapons } = snapshot;

  return new Character(
    _id,
    alignment,
    armor,
    background,
    className,
    deathSaves,
    equipment,
    featureTraits,
    gold,
    hp,
    inspriation,
    languages,
    level,
    name,
    proficiencies,
    race,
    savingThrows,
    scores,
    skills,
    speed,
    spellCastStat,
    spellSlots,
    treasures,
    weapons
  );
}