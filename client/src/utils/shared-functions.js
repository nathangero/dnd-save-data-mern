export const calcProficiencyBonus = (level) => {
  return getStatBonusSign(1 + Math.ceil(level/4));
}

export const calcPassivePerception = (wis, level, proficient) => {
  let bonus = proficient ? calcProficiencyBonus(level) : 0
  return getStatBonusSign(10 + calcScoreMod(wis) + bonus)
}

export const calcScoreMod = (score) => {
  return getStatBonusSign(Math.floor((score - 10) / 2));
}

export const getScoreName = (score) => {
  switch (score) {
    case "cha":
      return "Charisma";

    case "con":
      return "Constitution";

    case "dex":
      return "Dexterity";

    case "int":
      return "Intelligence";

    case "str":
      return "Strength";

    case "wis":
      return "Wisdom";
  }
}

export const getStatBonusSign = (stat) => {
  if (stat < 0) {
    return stat // the negative will already be apart of the number
  } else {
    return "+" + stat
  }
}