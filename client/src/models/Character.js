export function Character(character) {
  this._id = character._id
  this.alignment = character.alignment
  this.armor = character.armor
  this.background = character.background
  this.class = character.class
  this.deathSaves = character.deathSaves
  this.equipment = character.equipment
  this.featureTraits = character.featureTraits
  this.gold = character.gold
  this.hp = character.hp
  this.inspriation = character.inspriation
  this.languages = character.languages
  this.level = character.level
  this.name = character.name
  this.proficiencies = character.proficiencies
  this.race = character.race
  this.savingThrows = character.savingThrows
  this.scores = character.scores
  this.skills = character.skills
  this.speed = character.speed
  this.spellCastStat = character.spellCastStat
  this.spellSlots = character.spellSlots
  this.timeCreated = Date.now
  this.treasures = character.treasures
  this.weapons = character.weapons
}