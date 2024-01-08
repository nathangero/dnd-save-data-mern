export const calcPassivePerception = (wis, level, proficient, showSign = false) => {
  const bonus = proficient ? calcProficiencyBonus(level) : 0;
  const calc = 10 + calcScoreMod(wis) + bonus;
  return showSign ? getStatBonusSign(calc) : calc;
}

export const calcProficiencyBonus = (level, showSign = false) => {
  const calc = 1 + Math.ceil(level/4);
  return showSign ? getStatBonusSign(calc) : calc;
}

export const calcScoreWithProficiency = (score, level, proficient, showSign = false) => {
  const bonus = proficient ? calcProficiencyBonus(level) : 0;
  const calc = calcScoreMod(score) + bonus;
  return showSign ? getStatBonusSign(calc) : calc;
}

export const calcScoreMod = (score, showSign = false) => {
  const calc = Math.floor((score - 10) / 2);
  return showSign ? getStatBonusSign(calc) : calc;
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