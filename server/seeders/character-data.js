const characterData = [
  {
    alignment: "True Neutral",
    armor: 14,
    background: "Soldier",
    class: "Barbarian",
    deathSaves: {
      failures: 0,
      successes: 0
    },
    equipment: [
      {
        amount: 2,
        description: "Good stuff",
        name: "Milk"
      },
      {
        amount: 999,
        description: "let's me breathe",
        name: "Air"
      }
    ],
    featureTraits: [
      {
        actionType: "Action",
        description: "I can jump high",
        name: "Space Jump",
        traitType: "Other",
        uses: 999
      }
    ],
    gold: 20,
    hp: {
      current: 15,
      dieType: "1d8",
      dieAmountCurrent: 5,
      dieAmountMax: 5,
      max: 15,
      temp: 0,
    },
    inspiration: 1,
    languages: [
      {
        name: "Orcish",
        proficiency: "Spoken"
      },
      {
        name: "Common",
        proficiency: "Fluent"
      }
    ],
    level: 3,
    name: "Bob",
    proficiencies: [
      {
        description: "I can live",
        name: "Breathing"
      }
    ],
    race: "Human",
    savingThrows: {
      "cha": false,
      "con": true,
      "dex": false,
      "int": false,
      "str": true,
      "wis": false
    },
    scores: {
      "cha": 12,
      "con": 14,
      "dex": 16,
      "int": 10,
      "str": 18,
      "wis": 8
    },
    skills: {
      "acrobatics": true,
      "animalHandling": false,
      "arcana": false,
      "athletics": true,
      "deception": true,
      "history": false,
      "insight": false,
      "intimidation": true,
      "investigation": false,
      "medicine": false,
      "nature": false,
      "perception": false,
      "performance": false,
      "persuasion": false,
      "religion": false,
      "sleightOfHand": false,
      "stealth": true,
      "survival": false
    },
    speed: 30,
    spellCastStat: "wis",
    spellSlots: {
      level_1: {
        current: 5,
        max: 5
      },
      level_2: {
        current: 3,
        max: 3
      }
    },
    spells: {
      cantrips: [
        {
          "castingTime": 2,
          "description": "blows up stuff blows up stuff blows up stuff blows up stuff blows up stuff blows up stuff blows up stuff blows up stuff blows up stuff blows up stuff ",
          "duration": 23,
          "durationType": "seconds",
          "range": 32,
          "name": "asdf"
        },
        {
          "castingTime": 11,
          "description": "does something cool does something cool does something cool does something cool does something cool does something cool does something cool does something cool ",
          "duration": 0,
          "durationType": "instant",
          "range": 111,
          "name": "fdsa"
        }
      ],
      "level_1": [
        {
          "castingTime": 22,
          "description": "makes me win makes me win makes me win makes me win makes me win makes me win makes me win makes me win makes me win makes me win makes me win makes me win makes me win ",
          "duration": 22,
          "durationType": "seconds",
          "range": 222,
          "name": "jkl",
        }
      ]
    },
    treasures: [
      {
        amount: 23,
        description: "A bunch of good stuff",
        name: "Stuff"
      }
    ],
    weapons: [
      {
        amount: 1,
        attackDamageStat: "dex",
        category: "Simple",
        description: "Must reload after every shot. Reload takes one full action. \n\nRange: 40-80ft",
        die: "d6",
        proficient: false,
        name: "Flintlock pistol"
      },
      {
        amount: 1,
        attackDamageStat: "dex",
        category: "Simple",
        description: "Range: 150ft/300ft",
        die: "d8",
        proficient: true,
        name: "Long bow"
      }
    ]
  },
]

const characterDataBad = [
  {

  }
]

export { characterData, characterDataBad }