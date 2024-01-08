export const calcPassivePerception = (wis, level, proficient, showSign = false) => {
  const bonus = proficient ? calcProficiencyBonus(level) : 0;
  const calc = 10 + calcScoreMod(wis) + bonus;
  return showSign ? getStatBonusSign(calc) : calc;
}

export const calcProficiencyBonus = (level, showSign = false) => {
  const calc = 1 + Math.ceil(level / 4);
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

/**
 * Creates a div id from the feature/trait name
 * @param {String} name Feature/Trait name
 * @returns A string of the name lowercased and spaces replacecd with dashes 
 */
export const makeIdFromName = (name) => {
  const id = name.toLowerCase().split(" ").join("-");
  return id;
}

/**
 * Scrolls the window to the appropriate id
 * @param {String} id id of the div to scroll to
 * @param {Document} document The document where the id is
 * @param {Window} window The window that will scroll to the id
 */
export const scrollToListItem = (id, document, window) => {
  const sectionElement = document.getElementById(id);
  if (sectionElement) {
    const sectionTop = sectionElement.getBoundingClientRect().top;
    const adjustedScrollTop = sectionTop + window.scrollY - 105;
    window.scrollTo({ top: adjustedScrollTop, behavior: 'smooth' });
  }
}

/**
 * Takes an array and sets all the `.name` attributes as the key, and converts the key to an id using the `makeIdFromName()` function.
 * So if the `.name` is "Action Surge", its id will be "action-surge".
 * @param {Array} list 
 * @returns An object where the keys are the list item name, and its value is the id created for the item
 */
export const makeJumpToForSection = (list) => {
  const jumpToMenu = {};

  list?.map(item => {
    const id = makeIdFromName(item.name);
    jumpToMenu[item.name] = id; // Add the new name with its div id
  })

  return jumpToMenu
}